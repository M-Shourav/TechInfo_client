"use client";
import { useEffect, useState } from "react";
import Container from "../container";
import axios from "../../../utils/axiosInstance";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CategoryType } from "../../../types/postType";
import { useRouter } from "next/navigation";

const AllCategories = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<CategoryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/category/getCategories");
        const data = res?.data;
        if (data?.success) {
          setCategory(data?.categories);
        }
      } catch (error) {
        console.log("Categories fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllCategories();
  }, []);
  return (
    <Container className="py-10">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between cursor-pointer"
            disabled={loading}
          >
            {value
              ? category.find((category) => category?.slug === value)?.name
              : "Select Categories..."}
            <ChevronDown className=" opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No Categories found.</CommandEmpty>
            </CommandList>
            <CommandGroup heading="All Categories">
              {category?.map((item) => (
                <CommandItem
                  key={item?.slug}
                  className="cursor-pointer"
                  value={item?.slug}
                  onSelect={(slug) => {
                    setValue(slug);
                    setOpen(false);

                    if (slug) {
                      router.push(`/category/${slug}`);
                    }
                  }}
                >
                  {item?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </Container>
  );
};

export default AllCategories;
