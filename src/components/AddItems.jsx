import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CustomInput = ({ label, name, control, rules, placeholder, type }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type={type || 'text'}
            placeholder={placeholder || 'Enter Response'}
            className={`mt-1 ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm`}
          />
        )}
      />
    </div>
  );
};

function MyForm() {
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <CustomInput
        label='Username'
        name='username'
        control={control}
        rules={{ required: 'Username is required' }}
        placeholder='Enter your username'
        type='text'
      />
      {errors.username && (
        <p className='text-red-500 text-xs'>{errors.username.message}</p>
      )}

      <CustomInput
        label='Description'
        name='description'
        control={control}
        rules={{ required: 'Description is required' }}
        placeholder='Enter description'
        type='text'
      />
      {errors.description && (
        <p className='text-red-500 text-xs'>{errors.description.message}</p>
      )}

      <CustomInput
        label='Price'
        name='price'
        control={control}
        rules={{ required: 'Price is required' }}
        placeholder='Enter price'
        type='number'
      />
      {errors.price && (
        <p className='text-red-500 text-xs'>{errors.price.message}</p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Select category" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <Option value="electronics">Electronics</Option>
              <Option value="clothing">Clothing</Option>
              <Option value="books">Books</Option>
            </Select>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <Controller
          name="image"
          control={control}
          rules={{ required: 'Image is required' }}
          render={({ field }) => (
            <Upload {...field} maxCount={1} listType="picture" beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('You can only upload image files!');
              }
              return isImage;
            }}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          )}
        />
        {errors.image && (
          <p className='text-red-500 text-xs'>{errors.image.message}</p>
        )}
      </div>

      <Button type="primary" htmlType="submit" disabled={isSubmitting} className="w-full 
bg-blue-400">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}

export default MyForm;
