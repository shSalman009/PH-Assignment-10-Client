"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2, ImagePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { createRecipeAction, updateRecipeAction } from "@/lib/actions/recipes";
import { recipeFormSchema } from "@/lib/schemas";

// Accept initialData for Edit Mode
export default function RecipeForm({ initialData = null }) {
  console.log(initialData);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isEditMode = !!initialData;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [imageError, setImageError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map default values dynamically for Edit Mode vs Create Mode
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      cuisineType: initialData?.cuisineType || "",
      difficulty: initialData?.difficultyLevel || initialData?.difficulty || "",
      prepTime: initialData?.preparationTime || initialData?.prepTime || "",
      ingredients: initialData?.ingredients
        ? initialData.ingredients.map((ing) => ({ value: ing }))
        : [{ value: "" }],
      instructions: initialData?.instructions
        ? initialData.instructions.map((inst) => ({ value: inst }))
        : [{ value: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instructions" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError("");
    }
  };

  // validation image presence before allowing form submission
  const validateImage = () => {
    if (!imageFile && !imagePreview) {
      setImageError("Please upload a display header image for this recipe.");
      return false;
    }
    setImageError("");
    return true;
  };

  // Main form submission handler for both Create and Edit modes
  const onSubmit = async (data) => {
    if (!validateImage()) return;

    setIsSubmitting(true);
    const progressToast = toast.loading(
      isEditMode
        ? "Saving recipe modifications..."
        : "Publishing new recipe...",
    );

    try {
      let uploadedImageUrl = imagePreview;

      // Only upload to Imgbb if a new image file is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const imgbbData = await imgbbRes.json();
        if (!imgbbData.success) {
          throw new Error("Image hosting platform upload failed.");
        }
        uploadedImageUrl = imgbbData.data.url;
      }

      const recipePayload = {
        name: data.name,
        image: uploadedImageUrl,
        category: data.category,
        cuisineType: data.cuisineType,
        difficultyLevel: data.difficulty,
        preparationTime: data.prepTime,
        ingredients: data.ingredients.map((item) => item.value),
        instructions: data.instructions.map((item) => item.value),
        userId: initialData?.userId || session?.user?.id,
        likeCount: initialData?.likeCount || 0,
        isFeatured: initialData?.isFeatured || false,
      };

      // Conditionally execute the right action based on mode
      let response;
      if (isEditMode) {
        response = await updateRecipeAction(initialData._id, recipePayload);
      } else {
        response = await createRecipeAction(recipePayload);
      }

      if (!response.success) {
        throw new Error(response.error || "Failed to process recipe request.");
      }

      toast.success(
        isEditMode
          ? "Recipe updated successfully!"
          : "Recipe published successfully!",
        { id: progressToast },
      );

      setImageFile(null);
      setImagePreview("");
      reset();

      router.push("/dashboard/my-recipes");
    } catch (error) {
      toast.error(error.message, { id: progressToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalidSubmit = () => {
    validateImage();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
    >
      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              {isEditMode ? "Modify Recipe Details" : "Recipe Core Details"}
            </CardTitle>
            <CardDescription>
              Primary identification details stored in your collections
              registry.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipe Title Name</label>
              <Input
                placeholder="e.g., Spicy Creamy Garlic Pasta"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-semibold text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Class</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Desserts">Desserts</SelectItem>
                        <SelectItem value="Beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cuisine Type</label>
                <Input
                  placeholder="e.g., Italian, Mexican, Bengali"
                  {...register("cuisineType")}
                />
                {errors.cuisineType && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.cuisineType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Scale</label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Preparation Time (Minutes)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 25"
                  {...register("prepTime")}
                />
                {errors.prepTime && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.prepTime.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* INGREDIENTS */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg">Ingredients List</CardTitle>
              <CardDescription>
                Specify measurements and component names cleanly.
              </CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => appendIngredient({ value: "" })}
              className="gap-1"
            >
              <Plus className="w-4 h-4" /> Add Line
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="space-y-1">
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder={`Ingredient item #${index + 1}`}
                    {...register(`ingredients.${index}.value`)}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredientFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {errors.ingredients?.[index]?.value && (
                  <p className="text-[11px] font-medium text-destructive pl-1">
                    {errors.ingredients[index].value.message}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* INSTRUCTIONS */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg">
                Preparation Instructions
              </CardTitle>
              <CardDescription>
                Detail consecutive directions to finalize the cooking process.
              </CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => appendInstruction({ value: "" })}
              className="gap-1"
            >
              <Plus className="w-4 h-4" /> Add Step
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {instructionFields.map((field, index) => (
              <div key={field.id} className="space-y-1">
                <div className="flex gap-2 items-start">
                  <div className="bg-muted text-xs font-bold w-6 h-10 flex items-center justify-center rounded-lg border shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <Textarea
                    placeholder="Describe sequential steps or instructions here..."
                    {...register(`instructions.${index}.value`)}
                    rows={2}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive shrink-0 mt-1"
                    onClick={() => removeInstruction(index)}
                    disabled={instructionFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {errors.instructions?.[index]?.value && (
                  <p className="text-[11px] font-medium text-destructive pl-8">
                    {errors.instructions[index].value.message}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT MEDIA COLUMN */}
      <div className="space-y-6 lg:sticky lg:top-24">
        <Card
          className={`shadow-sm transition-colors ${
            imageError ? "border-destructive bg-destructive/5" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="text-lg">Recipe Media</CardTitle>
            <CardDescription>
              Upload a clear image of your completed dish.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col items-center justify-center border-2 rounded-xl border-dashed p-3 bg-muted/20 min-h-[180px] relative transition-colors hover:bg-muted/40 group">
              {imagePreview ? (
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-full py-8 text-center"
                >
                  <ImagePlus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-semibold text-primary">
                    Click to upload via Imgbb
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    PNG, JPG or WEBP formats
                  </span>
                </label>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {imageError && (
              <p className="text-xs font-semibold text-destructive pl-1">
                {imageError}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-muted/20">
          <CardContent className="pt-6 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isEditMode ? "Saving..." : "Publishing..."}
                </>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Publish Recipe"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full h-11"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
