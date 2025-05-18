import { Request, Response } from 'express';
import { StudentService } from "../services/studentService.js";
import { InMemoryStudentRepository } from "../repositories/studentRepository.js";

const studentService = new StudentService(new InMemoryStudentRepository());

export const createStudent = async (req: Request, res: Response) => {
    const { name, age, course } = req.body;
    const response = await studentService.createStudent({ name, age, course });
    res.status(response.success ? 201 : 400).json(response);
}

export const getAllStudents = async (req: Request, res: Response) => {
    const response = await studentService.getAllStudents();
    res.status(response.success ? 200 : 400).json(response);
};

export const getStudentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const response = await studentService.getStudentById(id);
    res.status(response.success ? 200 : 400).json(response);
};

export const updateStudent = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const response = await studentService.updateStudent(id, req.body);
    res.status(response.success ? 200 : 400).json(response);
};

export const deleteStudent = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const response = await studentService.deleteStudent(id);
    res.status(response.success ? 200 : 400).json(response);
};
