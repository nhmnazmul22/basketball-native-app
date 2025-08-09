import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import React from "react";

import type { SelectProps } from "tamagui";
import { Adapt, Select, Sheet, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export function SelectOptions() {
  return (
    <YStack gap="$4">
      <XStack width={"100%"} gap="$4">
        <SelectContents id="select-options" native />
      </XStack>
    </YStack>
  );
}

export function SelectContents(
  props: SelectProps & { trigger?: React.ReactNode }
) {
  const [val, setVal] = React.useState("daily");

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      {props?.trigger || (
        <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
          <Select.Value placeholder="Something" />
        </Select.Trigger>
      )}

      <Adapt when platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animation="medium"
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          justify="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack z={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
          />
        </Select.ScrollUpButton>

        <Select.Viewport minW={200}>
          <Select.Group>
            <Select.Label>Select Filter Type</Select.Label>
            {React.useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          verticalAlign="center"
          justify="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack z={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            rounded="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

const items = [{ name: "Daily" }, { name: "Monthly" }, { name: "Yearly" }];
