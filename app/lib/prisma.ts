import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma ||
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });

// We have initialized a global prisma client that we will use everywhere, and we are checking if the client exists globally reuse it. Else create new and log config helps during development environment to see what's happening

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;