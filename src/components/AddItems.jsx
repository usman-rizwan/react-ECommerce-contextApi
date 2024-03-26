import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  storage,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  collection,
  addDoc,
  db,
  updateDoc,
} from "../db/index.js";
import { toast } from "sonner";

const { Option } = Select;
const { TextArea } = Input;

const CustomInput = ({
  label,
  name,
  control,
  rules,
  placeholder,
  type,
  disabled,
  defaultValue,
}) => {
  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <TextArea
              {...field}
              placeholder={placeholder || "Enter Response"}
              autoSize={{ minRows: 3, maxRows: 6 }}
              className={`mt-1 ${
                fieldState.invalid ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm w-full h-32`}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type={type || "text"}
            placeholder={placeholder || "Enter Response"}
            className={`mt-1 ${
              fieldState.invalid ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm`}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

const MyForm = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm({ mode: "onChange" });
  const storage = getStorage();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { file } = data.image;
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // Handle different states if needed
        },
        (error) => {
          console.error("Error:", error);
          toast.error("An error occurred while uploading the image.");
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
  
            const formData = {
              username: data.username,
              description: data.description,
              price: data.price,
              qty: data.qty,
              category: data.category,
              imageUrl: imageUrl, 
            };
  
            // Add data to Firestore
            const docRef = await addDoc(collection(db, "products"), formData);
            await updateDoc(docRef, {
              id: docRef.id,
            });
  
            // Reset the form after successful submission
            reset({
              username: "Admin", // Reset to default value
              description: "",
              price: "",
              qty: "",
              category: "",
              image: undefined, // Clear the image field
            });
  
            toast.success("Form submitted successfully!");
            setLoading(false);
            
          } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while getting download URL.");
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  const handleImageChange = (info) => {
    const { file, fileList } = info;
    if (file.status === "done") {
      setIsImageUploaded(true);
    } else if (file.status === "removed" && fileList.length === 0) {
      setIsImageUploaded(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10"
    >
      <CustomInput
        label="Username"
        name="username"
        control={control}
        placeholder="Enter your username"
        type="text"
        disabled={true}
        defaultValue="Admin" 
      />

      {errors.username && (
        <p className="text-red-500 text-xs">{errors.username.message}</p>
      )}

      <CustomInput
        label="Description"
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          validate: (value) => value.trim() !== "" || "Description is required",
        }}
        placeholder="Enter product description"
        type="textarea"
      />
      {errors.description && (
        <p className="text-red-500 text-xs">{errors.description.message}</p>
      )}

      <CustomInput
        label="Price"
        name="price"
        control={control}
        rules={{
          required: "Price is required",
          validate: {
            notEmpty: (value) => value.trim() !== "" || "Price is required",
            greaterThanZero: (value) =>
              parseFloat(value) > 0 || "Price must be greater than zero",
            greaterThanLakh: (value) =>
              parseFloat(value) <= 100000 || "Price must be less than one lakh",
          },
        }}
        placeholder="Enter product price"
        type="number"
      />
      {errors.price && (
        <p className="text-red-500 text-xs">{errors.price.message}</p>
      )}
      <CustomInput
        label="Quantity"
        name="qty"
        control={control}
        rules={{
          required: "Quantity is required",
          validate: {
            notEmpty: (value) => value.trim() !== "" || "Quantity is required",
            greaterThanZero: (value) =>
              parseFloat(value) > 0 || "Quantity must be greater than zero",
            greaterThanLakh: (value) =>
              parseFloat(value) <= 1000 ||
              "Quantity must be less than  thousand",
          },
        }}
        placeholder="Enter product quantity"
        type="number"
      />
      {errors.qty && (
        <p className="text-red-500 text-xs">{errors.qty.message}</p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Click to select product category"
              className={`mt-1 block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md `}
              suffixIcon={""}
            >
              <Option value="electronics">Electronics</Option>
              <Option value="men clothing">Men Clothing</Option>
              <Option value="Women clothing">Women Clothing</Option>
              <Option value="jewellery">Jewellery</Option>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <Controller
          name="image"
          control={control}
          rules={{
            required: "Image is required",
            validate: {
              checkImage: (value) => {
                if (!value || value.length === 0) {
                  return "Image is required";
                }
                setIsImageUploaded(true);
                return undefined;
              },
            },
          }}
          render={({ field }) => (
            <Upload
              {...field}
              accept="image/png, image/jpeg"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} 
              onChange={(info) => {
                field.onChange(info); 
                handleImageChange(info); 
              }}
            >
              <div className="flex justify-center items-center">
                <Button
                  className="sm:w-full w-72 text-sm "
                  icon={<InboxOutlined />}
                >
                  Click or drag file to this area to upload
                </Button>
              </div>
            </Upload>
          )}
        />

        {errors.image && (
          <p className="text-red-500 text-xs">{errors.image.message}</p>
        )}
      </div>

      <Button
  type="primary"
  htmlType="submit"
  disabled={loading || !isValid || isSubmitting}
  className="w-full bg-blue-400"
>
  {loading ? "Submitting..." : "Submit"}
</Button>
    </form>
  );
};

export default MyForm;
