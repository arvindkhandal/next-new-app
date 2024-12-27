// components/MenuForm.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { getParentIdData } from "./store/slices";

type FormSubmitData = {
  menuId: string;
  depth: number;
  parentData: string;
  name: string;
};

type FormState = {
  menuId: string;
  depth: string;
  parentData: string;
  name: string;
};

type MenuFormProps = {
  onSubmit: (data: FormSubmitData) => void;
  selectedItem?: any;
  mode?: string;
};

const MenuForm: React.FC<MenuFormProps> = ({
  onSubmit,
  selectedItem,
  mode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { editParent } = useSelector(
    (state: RootState) => state.selectedCategoriesSlice
  );
  const [formData, setFormData] = useState<FormState>({
    menuId: "",
    depth: "",
    parentData: "",
    name: "",
  });
  console.log(selectedItem, mode, "selectedItem");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      menuId: "",
      depth: "",
      parentData: "",
      name: "",
    });
    const submitData: FormSubmitData = {
      menuId: selectedItem?.id || undefined,
      depth: Number(formData.depth) || 0, // Convert to number explicitly
      parentData: formData.parentData,
      name: formData.name,
    };
    console.log(submitData, "selectedItem");
    if (submitData?.name){
      onSubmit(submitData);
    }

  };
  useEffect(() => {
    if (selectedItem?.parentId) {
      dispatch(getParentIdData(selectedItem?.parentId));
    }
  }, [selectedItem?.parentId]);

  useEffect(() => {
    if (mode === "edit" && selectedItem) {
      setFormData({
        menuId: selectedItem?.id || "",
        depth: selectedItem?.depth || "",
        parentData: editParent || "",
        name: selectedItem?.name || "",
      });
    } else if (mode === "add" && selectedItem) {
      setFormData({
        menuId: selectedItem?.id || "",
        depth: selectedItem?.depth || "",
        parentData: selectedItem?.name || "",
        name: "",
      });
    }
  }, [selectedItem, mode, editParent]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 widthFull "
    >
      <div>
        <label
          htmlFor="menuId"
          className="block text-sm font-bold text-gray-700"
        >
          Menu ID
        </label>
        <input
          id="menuId"
          name="menuId"
          type="text"
          disabled
          value={formData?.menuId}
          onChange={handleChange}
          className="mt-1 p-4 w-full border-gray-300 rounded-[18px] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Menu ID"
        />
      </div>

      <div>
        <label
          htmlFor="depth"
          className="block text-sm font-bold text-gray-700"
        >
          Depth
        </label>
        <input
          id="depth"
          name="depth"
          type="number"
          value={formData?.depth}
          disabled
          onChange={handleChange}
          className="mt-1 block w-full p-4 border-gray-300 rounded-[18px] shadow-sm bg-[#EAECF0] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Depth"
        />
      </div>

      <div>
        <label
          htmlFor="parentData"
          className="block text-sm font-bold text-[#475467]"
        >
          Parent Data
        </label>
        <input
          id="parentData"
          name="parentData"
          type="text"
          disabled
          value={formData?.parentData}
          onChange={handleChange}
          className="mt-1 block w-full p-4 border-gray-300 rounded-[18px] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Parent Data"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-4 border-gray-300 rounded-[18px] shadow-sm focus:ring-blue-500 focus:border-[#253BFF] sm:text-sm"
          placeholder="Enter Name"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#253BFF] text-white py-3 px-4 rounded-[25px] hover:bg-[#253BFF] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save
      </button>
    </form>
  );
};

export default MenuForm;
