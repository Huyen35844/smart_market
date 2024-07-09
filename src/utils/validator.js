import * as yup from 'yup';

export const validate = async (schema, value) => {
    try {
        //strict (true) means: schema (age, name) but data (age, name, hobby) => fine
        const data = await schema.validate(value, { strict: true, abortEarly: false });
        return { values: data }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            //set abortEarly as true, yup catchs the error not in order
            //set abortEarly as false, yup catchs all the error at once (5 errors occurs)
            //set inner[0] to only get the first error yup catch to solve this problem
            return { error: error.inner[0].message }
        } else {
            return { error: error.message }
        }
    }
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
    return this.matches(emailRegex, {
        message,
        name: "email",
        excludeEmptyString: true
    })
})

const email = { email: yup.string().email("Invalid email!").required("Email is missing!") }
const password = {
    password: yup
        .string()
        .required("Password is missing!")
        .min(8, "Password should be at least 8 chars long!")
        .matches(passwordRegex, "Password is too simple!"),
}
const name = { name: yup.string().required("Name is missing!") }
//The .oneOf() method is used to specify a list of allowed values, and Yup.ref() is used to reference another field in the schema.
const confirmPassword = { confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!').required("Confirm Password is missing!") }

export const newUserSchema = yup.object({
    ...name,
    ...email,
    ...password,
    ...confirmPassword
})

export const signInSchema = yup.object({
    ...email,
    ...password
})

export const newProduct = yup.object({
    name: yup.string().required("Product's name is missing!"),
    price: yup
        .string()
        .transform((value) => {
            if (isNaN(+value)) return "";

            return value;
        })
        .required("Invalid price!"),
    category: yup.string().required("Category is missing!"),
    description: yup.string().required("Description is missing!"),
    purchasingDate: yup.date().required("Purchasing date is missing!")
})


