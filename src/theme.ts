import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  color: {
    primary: {
      50: "#f5faff", // 淺色
      100: "#e0f0ff", // 次淺色
      200: "#b3d8ff", // 中間色
      300: "#80c0ff", // 鮮豔色
      400: "#3399ff", // 主要色
      500: "#0077ff", // 強調色
      600: "#005bb5", // 深色
      700: "#003f80", // 更深色
      800: "#002a4d", // 深色2
      900: "#00121a", // 最深色
    },
    secondary: {
      50: "#e0f7ff", // 非常淺的海洋藍色
      100: "#b3e5fc", // 淺海洋藍
      200: "#81d4fa", // 較淺的海洋藍
      300: "#4fc3f7", // 較鮮豔的海洋藍
      400: "#29b6f6", // 中等深度的海洋藍
      500: "#03a9f4", // 標準海洋藍
      600: "#039be5", // 深海洋藍
      700: "#0288d1", // 更深的海洋藍
      800: "#0277b3", // 非常深的海洋藍
      900: "#01579b", // 最深的海洋藍
    },
    oceanGreenBlue: {
      50: "#e0f7f3", // 非常淺的綠藍色
      100: "#b2ebf2", // 淺綠藍色
      200: "#80e0e0", // 淡綠藍色
      300: "#4dd2d3", // 較鮮豔的綠藍色
      400: "#26c6da", // 鮮豔的綠藍色
      500: "#00bcd4", // 標準的綠藍色
      600: "#00acc1", // 深綠藍色
      700: "#008c99", // 更深的綠藍色
      800: "#00778a", // 非常深的綠藍色
      900: "#005e6a", // 最深的綠藍色
    },
    red: {
      50: "#ffe6e6",
      100: "#ffcccc",
      200: "#ffb3b3",
      300: "#ff9999",
      400: "#ff6666",
      500: "#ff3333",
      600: "#e60000",
      700: "#b30000",
      800: "#800000",
      900: "#4d0000",
    },
    background: {
      50: "#f7fafc", // 非常淺的灰色
      100: "#edf2f7", // 很淺的灰色
      200: "#e2e8f0", // 淺灰色
      300: "#cbd5e0", // 淺中灰色
      400: "#a0aec0", // 中灰色
      500: "#718096", // 標準灰色
      600: "#4a5568", // 深灰色
      700: "#2d3748", // 更深灰色
      800: "#1a202c", // 非常深灰色
      900: "#171923", // 最深灰色
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
        _focus: {
          boxShadow: "outline", // 有陰影
        },
      },
      size: {
        lg: {
          fontSize: "lg",
          px: 8,
          py: 6,
        },
        md: {
          fontSize: "md",
          px: 6,
          py: 4,
        },
        sm: {
          fontSize: "sm",
          px: 4,
          py: 3,
        },
      },
      variants: {
        primary: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "primary",
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "md",
        _focus: {
          boxShadow: "outline", // 有陰影
        },
      },
      size: {
        lg: {
          fontSize: "lg",
          px: 6,
          py: 4,
        },
        md: {
          fontSize: "md",
          px: 5,
          py: 3,
        },
        sm: {
          fontSize: "sm",
          px: 4,
          py: 2,
        },
      },
      defaultProps: {
        size: "md",
      },
    },
  },
});

export default theme;
