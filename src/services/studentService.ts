import { StudentRepository } from "../repositories/studentRepository.js";
import {
    Student,
    CreateStudentRequest,
    UpdateStudentRequest,
    ApiResponse,
} from "../models/studentModel.js";

export class StudentService {
    constructor(private studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }
    async createStudent(request: CreateStudentRequest): Promise<ApiResponse<Student>> {
        try {
            const student = await this.studentRepository.create(request);
            return { success: true, data: student };
        } catch (error) {
            return { success: false, message: "Error creating student" };
        }
    }
    
    async getAllStudents(): Promise<ApiResponse<Student[]>> {
        try {
            const students = await this.studentRepository.getAll();
            return { success: true, data: students };
        } catch (error) {
            return { success: false, message: "Error fetching students" };
        }
    }
    async getStudentById(id: number): Promise<ApiResponse<Student>> {
        try {
            const student = await this.studentRepository.getById(id);
            if (!student) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: student };
        } catch (error) {
            return { success: false, message: "Error retrieving student" };
        }
    }

    async updateStudent(
        id: number,
        request: UpdateStudentRequest
    ): Promise<ApiResponse<Student>> {
        try {
            const updatedStudent = await this.studentRepository.update(id, request);
            if (!updatedStudent) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: updatedStudent };
        } catch (error) {
            return { success: false, message: "Error updating student" };
        }
    }

    async deleteStudent(id: number): Promise<ApiResponse<boolean>> {
        try {
            const success = await this.studentRepository.delete(id);
            if (!success) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: success };
        } catch (error) {
            return { success: false, message: "Error deleting student" };
        }
    }
}
