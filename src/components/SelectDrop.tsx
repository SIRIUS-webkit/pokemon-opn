"use client";

import React, { FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropProps {
  lists: [];
  label: string;
  handleChange: (value: string, category: string) => {};
  category: string;
}

const SelectDrop: FC<DropProps> = ({
  lists,
  label,
  handleChange,
  category,
}) => {
  return (
    <Select onValueChange={(value) => handleChange(value, category)}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className=" ">
          {lists.map((list: any) => (
            <SelectItem key={list.id} value={list.name}>
              {list.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDrop;
