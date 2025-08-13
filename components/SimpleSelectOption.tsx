import React, { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { Select, YStack } from "tamagui";

interface Props {
  data?: any;
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SimpleSelectOption = ({ data, label, value, setValue }: Props) => {
  const [start, setStart] = useState(false);

  return (
    <YStack className="relative">
      <Select
        value={value || ""}
        onValueChange={(val) => {
          setValue(val);
          setStart(false);
        }}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setStart(true);
          }
        }}
      >
        <Select.Trigger>
          <Select.Value placeholder={label || "Choose options..."} />
        </Select.Trigger>

        <Select.Content>
          <Select.Viewport unstyled>
            <View
              className={`absolute w-full z-30 top-[60px] border border-gray-300 rounded elevation-md shadow-md ${start ? "block" : "hidden"}`}
            >
              {data &&
                data.map((item: any, index: number) => (
                  <Select.Item key={item.id} index={index} value={item.name}>
                    <Select.ItemText>{item.name}</Select.ItemText>
                  </Select.Item>
                ))}
            </View>
          </Select.Viewport>
        </Select.Content>
      </Select>
    </YStack>
  );
};

export default SimpleSelectOption;
