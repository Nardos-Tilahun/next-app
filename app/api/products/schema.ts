import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, 'should be greater than 3'),
    price: z.number().min(0, 'should be greater than 0'),
    description: z.string().min(1, 'should be greater than 10').optional()
})

export default schema;