import z from "zod";


export const createCompanySchema = z.object({
    name: z.string().min(2, 'name_not_valid_short').max(70, 'name_not_valid_long').refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'name_not_valid_characters'),
    password: z.string().refine((value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value), 'password_not_valid_weak'),
    email: z.string().email('email_not_valid'),
    contact: z.string().min(1, 'contact_not_valid_short').max(9, 'contact_not_valid_long').refine((value) => /^\d{9}$/.test(value), 'contact_not_valid_not_digits'),
    contactPerson: z.string().min(1, 'contactPerson_name_not_valid_short').max(40, 'contactPerson_name_not_valid_long').refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'contactPerson_name_not_valid_characters'),
    isInternal: z.boolean(),
    image: z
    .any()
})