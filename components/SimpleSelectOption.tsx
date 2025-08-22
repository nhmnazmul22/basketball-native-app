import React, { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, View } from "react-native";
import { Select, YStack } from "tamagui";

interface Props {
  data?: any;
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SimpleSelectOption = ({ data, label, value, setValue }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <YStack className="relative">
      <Select
        value={value}
        onValueChange={(val) => {
          setValue(val);
          setOpen(false);
        }}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
      >
        <Select.Trigger>
          <Select.Value key={value} placeholder={label || "Choose options..."}>
            {value ? value : null}
          </Select.Value>
        </Select.Trigger>

        <Select.Content>
          <Select.Viewport unstyled>
            {open && (
              <View
                className={`absolute bg-white w-full z-[999] top-[55px] border border-gray-300 rounded shadow-md max-h-[150px] `}
              >
                <ScrollView nestedScrollEnabled>
                  {data &&
                    data.map((item: any, index: number) => (
                      <Select.Item
                        key={item.id || item._id}
                        index={index}
                        value={item.name}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                </ScrollView>
              </View>
            )}
          </Select.Viewport>
        </Select.Content>
      </Select>
    </YStack>
  );
};

export default SimpleSelectOption;
