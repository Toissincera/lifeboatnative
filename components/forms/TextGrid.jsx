import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function ControllerFormInput({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  required,
  errors = "Field required",
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        maxLength: 100,
        required: required,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={sx.parent}>
          <View style={sx.inputParent}>
            <TextInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              style={[
                sx.textInput,
                errors.message ? sx.borderWarning : sx.borderNormal,
              ]}
            />
          </View>
          {errors.message && <Text style={sx.warning}>{errors.message}</Text>}
        </View>
      )}
    />
  );
}

const sx = StyleSheet.create({
  parent: { display: "flex", flexDirection: "column" },
  inputParent: {
    display: "flex",
    width: "100%",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 8,
    paddingBottom: 6,
    padding: 0,
  },
  textInput: {
    width: "100%",
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 400,
    color: "rgba(0,0,0,0.87)",
  },
  warning: {
    fontSize: 16,
    fontWeight: 600,
    color: "tomato",
    textAlign: "left",
    paddingBottom: 6,
  },
  borderNormal: {
    borderColor: "rgba(0,0,0,0.23)",
  },
  borderWarning: {
    borderColor: "tomato",
  },
});
