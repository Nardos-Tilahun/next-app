import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, 'should be greater than 3'),
    email: z.string().email('invalid email')

})

export default schema;