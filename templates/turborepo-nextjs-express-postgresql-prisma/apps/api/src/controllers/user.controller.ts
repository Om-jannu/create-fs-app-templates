import { Request, Response } from 'express';
import { prisma } from '../index';
import type { ApiResponse } from '{{PROJECT_NAME}}-shared';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    const response: ApiResponse<typeof users> = {
      success: true,
      data: users,
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
    res.status(500).json(response);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found',
      };
      res.status(404).json(response);
      return;
    }
    
    const response: ApiResponse<typeof user> = {
      success: true,
      data: user,
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user',
    };
    res.status(500).json(response);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    
    const user = await prisma.user.create({
      data: { email, name },
    });
    
    const response: ApiResponse<typeof user> = {
      success: true,
      data: user,
      message: 'User created successfully',
    };
    
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
    res.status(500).json(response);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    
    const response: ApiResponse<typeof user> = {
      success: true,
      data: user,
      message: 'User deleted successfully',
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete user',
    };
    res.status(500).json(response);
  }
};

