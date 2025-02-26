import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";

export function AltaScreen() {
  const navigation = useNavigation();
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    salario: "",
    fecha_contratacion: new Date().toISOString().split("T")[0],
    id_departamento: "",
  });

  const [validacion, setValidacion] = useState({
    nombre: false,
    email: false,
    salario: false,
    fecha_contratacion: false,
    id_departamento: false,
  });

  const handleSubmit = async () => {
    if (validarDatos()) {
      try {
        const payload = {
          nombre: datos.nombre.trim(),
          email: datos.email.trim(),
          salario: parseFloat(datos.salario).toFixed(2),
          fecha_contratacion: datos.fecha_contratacion,
          id_departamento: datos.id_departamento
            ? parseInt(datos.id_departamento)
            : null,
        };

        const response = await fetch("http://localhost:3000/api/empleado/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error del servidor");
        }

        const respuesta = await response.json();
        alert(respuesta.mensaje);
        navigation.navigate("Home");
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    }
  };

  const validarDatos = () => {
    const validacionAux = {
      nombre: !datos.nombre.trim(),
      email: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(datos.email),
      salario:
        !/^\d+(\.\d{1,2})?$/.test(datos.salario) ||
        parseFloat(datos.salario) <= 0,
      fecha_contratacion: !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha_contratacion),
      id_departamento:
        datos.id_departamento && !/^\d+$/.test(datos.id_departamento),
    };

    setValidacion(validacionAux);
    return !Object.values(validacionAux).some((v) => v);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-gray-100 p-4">
      <VStack className="flex-1 max-w-2xl mx-auto justify-center">
        {/* Contenedor único con fondo oscuro para todo el formulario */}
        <View
          className="bg-gray-800 rounded-xl shadow-md p-6"
          style={{ flexDirection: "column", width: "100%" }}
        >
          {/* Header */}
          <View style={{ marginBottom: 20 }}>
            <h1 className="text-2xl font-bold text-white">Registro de Empleado</h1>
            <p className="text-gray-300 mt-1">
              Complete todos los campos requeridos
            </p>
          </View>

          {/* Campos del formulario */}
          <View style={{ flexDirection: "column", width: "100%" }}>
            {/* Campo Nombre */}
            <FormControl isInvalid={validacion.nombre} isRequired>
              <View style={{ flexDirection: "column", marginBottom: 15 }}>
                <FormControlLabel>
                  <FormControlLabelText className="text-white">
                    Nombre completo
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Ej: Carlos Jiménez"
                    placeholderTextColor="white"
                    value={datos.nombre}
                    onChangeText={(text) =>
                      setDatos({ ...datos, nombre: text })
                    }
                    style={{ color: "white", width: "100%" }}
                  />
                </Input>
                {validacion.nombre && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText className="text-white">
                      Nombre obligatorio
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </View>
            </FormControl>

            {/* Campo Email */}
            <FormControl isInvalid={validacion.email} isRequired>
              <View style={{ flexDirection: "column", marginBottom: 15 }}>
                <FormControlLabel>
                  <FormControlLabelText className="text-white">
                    Correo electrónico
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="white"
                    value={datos.email}
                    onChangeText={(text) =>
                      setDatos({ ...datos, email: text })
                    }
                    keyboardType="email-address"
                    style={{ color: "white", width: "100%" }}
                  />
                </Input>
                {validacion.email && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText className="text-white">
                      Formato de email inválido
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </View>
            </FormControl>

            {/* Campo Salario */}
            <FormControl isInvalid={validacion.salario} isRequired>
              <View style={{ flexDirection: "column", marginBottom: 15 }}>
                <FormControlLabel>
                  <FormControlLabelText className="text-white">
                    Salario
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Ej: 2500.00"
                    placeholderTextColor="white"
                    value={datos.salario}
                    onChangeText={(text) => {
                      const cleaned = text
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1");
                      setDatos({ ...datos, salario: cleaned });
                    }}
                    keyboardType="numeric"
                    style={{ color: "white", width: "100%" }}
                  />
                </Input>
                {validacion.salario && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText className="text-white">
                      Debe ser un número positivo (ej: 2500.00)
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </View>
            </FormControl>

            {/* Campo Fecha de Contratación */}
            <FormControl isInvalid={validacion.fecha_contratacion} isRequired>
              <View style={{ flexDirection: "column", marginBottom: 15 }}>
                <FormControlLabel>
                  <FormControlLabelText className="text-white">
                    Fecha de contratación
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="AAAA-MM-DD"
                    placeholderTextColor="white"
                    value={datos.fecha_contratacion}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/[^0-9]/g, "");
                      let formatted = cleaned.slice(0, 8);
                      if (cleaned.length > 4) {
                        formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(
                          4,
                          6
                        )}-${cleaned.slice(6, 8)}`;
                      }
                      setDatos({
                        ...datos,
                        fecha_contratacion: formatted.slice(0, 10),
                      });
                    }}
                    keyboardType="numbers-and-punctuation"
                    style={{ color: "white", width: "100%" }}
                  />
                </Input>
                {validacion.fecha_contratacion && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText className="text-white">
                      Formato inválido (AAAA-MM-DD)
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </View>
            </FormControl>

            {/* Campo Departamento */}
            <FormControl isInvalid={validacion.id_departamento}>
              <View style={{ flexDirection: "column", marginBottom: 15 }}>
                <FormControlLabel>
                  <FormControlLabelText className="text-white">
                    Departamento (opcional)
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Ej: 123"
                    placeholderTextColor="white"
                    value={datos.id_departamento}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/[^0-9]/g, "");
                      setDatos({ ...datos, id_departamento: cleaned });
                    }}
                    keyboardType="numeric"
                    style={{ color: "white", width: "100%" }}
                  />
                </Input>
                {validacion.id_departamento && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText className="text-white">
                      Debe ser un número entero
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </View>
            </FormControl>
          </View>

          {/* Botón del formulario con menos margen inferior y bordes redondeados */}
          <Button
            onPress={handleSubmit}
            className="mt-6 bg-red-600 hover:bg-red-700 h-12 w-full rounded-lg"
            style={{ marginBottom: 10 }}
          >
            <ButtonText className="text-white font-semibold">
              Registrar Empleado
            </ButtonText>
          </Button>
        </View>
      </VStack>
    </ScrollView>
  );
}
