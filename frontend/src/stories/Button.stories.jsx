import Button from "../components/Button";
export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary"],
        },
        disabled: {
            control: "boolean",
        },
        loading: {
            control: "boolean",
        },
        children: {
            control: "text",
        },
    },
};
export const Primary = {
    args: {
        variant: "primary",
        children: "Primary Button",
    },
};
export const Secondary = {
    args: {
        variant: "secondary",
        children: "Secondary Button",
    },
};
export const Disabled = {
    args: {
        variant: "primary",
        disabled: true,
        children: "Disabled Button",
    },
};
export const Loading = {
    args: {
        variant: "primary",
        loading: true,
        children: "Loading Button",
    },
};