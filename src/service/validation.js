import { z } from 'zod';

export const eventSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    img: z.string().optional().or(z.literal('')),
    price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number")),
    nbTickets: z.preprocess((val) => Number(val), z.number().int().min(0, "Number of tickets cannot be negative")),
    nbParticipants: z.preprocess((val) => val === '' ? 0 : Number(val), z.number().int().min(0).optional().default(0)),
});
