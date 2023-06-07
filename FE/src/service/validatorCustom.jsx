import SimpleReactValidator from "simple-react-validator";


const validatorCustom = new SimpleReactValidator({
    messages: {
        email: "vui long nhập gmail",
        required: `vui lòng nhập :attribute`,
        // OR
        // will override all messages
    },
    validators: {
        min6: {
            message: `Vui lòng nhập :attribute tối thiểu 6 kí tự.`,
            rule: (val, params, validator) => {
                return val.length >= 6;
            },
            required: true,
        },
        phone: {
            message: `Vui lòng nhập :attribute tối thiểu 6 kí tự.`,
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val, "(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}");
            },
            required: true,
        }
    }
});
export default  validatorCustom ;