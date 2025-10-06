import { api } from '../../app/api';
import { CreateUserRequest, UpdateUserRequest, UserFilters, CreateStudentRequest, StudentFilters, CreateFacultyRequest, FacultyFilters } from '../../types/api';
import { Student, Faculty, User } from '../../types/models';

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    username: 'student1',
    email: 'john.doe@aicas.edu',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    phone: '9876543210',
    dateOfBirth: '2000-01-15',
    gender: 'Male',
    role: 'Student',
    institutionId: '1',
    centreId: '1',
    departmentId: '1',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    studentId: 'STU001',
    rollNumber: '2023CS001',
    admissionNumber: 'ADM2023001',
    admissionType: 'Regular',
    academicYear: '2023-24',
    currentSemester: 3,
    admissionDate: '2023-07-01',
    status: 'Active',
    programId: '1',
    batchId: '1',
    cgpa: 8.5,
    attendancePercentage: 85,
    feeStatus: 'Paid',
  },
  {
    id: '2',
    username: 'student2',
    email: 'jane.smith@aicas.edu',
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    phone: '9876543211',
    dateOfBirth: '2000-05-20',
    gender: 'Female',
    role: 'Student',
    institutionId: '1',
    centreId: '1',
    departmentId: '1',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    studentId: 'STU002',
    rollNumber: '2023CS002',
    admissionNumber: 'ADM2023002',
    admissionType: 'Regular',
    academicYear: '2023-24',
    currentSemester: 3,
    admissionDate: '2023-07-01',
    status: 'Active',
    programId: '1',
    batchId: '1',
    cgpa: 9.2,
    attendancePercentage: 92,
    feeStatus: 'Paid',
  },
];

const mockFaculty: Faculty[] = [
  {
    id: '1',
    username: 'faculty1',
    email: 'dr.john.wilson@aicas.edu',
    firstName: 'Dr. John',
    lastName: 'Wilson',
    fullName: 'Dr. John Wilson',
    phone: '9876543220',
    dateOfBirth: '1980-03-10',
    gender: 'Male',
    role: 'Faculty',
    institutionId: '1',
    centreId: '1',
    departmentId: '1',
    isActive: true,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
    facultyId: 'FAC001',
    employeeId: 'EMP001',
    designation: 'Professor',
    qualification: 'Ph.D. in Computer Science',
    specialization: 'Data Structures and Algorithms',
    experienceYears: 15,
    joiningDate: '2022-07-01',
    salary: 150000,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<{ data: User[]; total: number }, UserFilters>({
      queryFn: async (filters) => {
        try {
          await delay(500);
          
          let filteredUsers = [...mockStudents, ...mockFaculty];
          
          // Apply filters
          if (filters.role) {
            filteredUsers = filteredUsers.filter(user => user.role === filters.role);
          }
          
          if (filters.departmentId) {
            filteredUsers = filteredUsers.filter(user => user.departmentId === filters.departmentId);
          }
          
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
              user.fullName.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm) ||
              (user as Student).rollNumber?.toLowerCase().includes(searchTerm) ||
              (user as Faculty).employeeId?.toLowerCase().includes(searchTerm)
            );
          }
          
          // Pagination
          const page = filters.page || 1;
          const limit = filters.limit || 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          
          const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
          
          return {
            data: {
              data: paginatedUsers,
              total: filteredUsers.length,
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      providesTags: ['User'],
    }),

    // Get user by ID
    getUserById: builder.query<User, string>({
      queryFn: async (id) => {
        try {
          await delay(300);
          
          const user = [...mockStudents, ...mockFaculty].find(u => u.id === id);
          
          if (!user) {
            return {
              error: {
                status: 404,
                data: { message: 'User not found' }
              }
            };
          }
          
          return { data: user };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Create user
    createUser: builder.mutation<User, CreateUserRequest>({
      queryFn: async (userData) => {
        try {
          await delay(1000);
          
          const newUser: User = {
            id: Date.now().toString(),
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone,
            role: userData.role,
            institutionId: '1',
            centreId: '1',
            departmentId: userData.departmentId,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          return { data: newUser };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),

    // Update user
    updateUser: builder.mutation<User, UpdateUserRequest>({
      queryFn: async ({ id, ...updates }) => {
        try {
          await delay(1000);
          
          const existingUser = [...mockStudents, ...mockFaculty].find(u => u.id === id);
          
          if (!existingUser) {
            return {
              error: {
                status: 404,
                data: { message: 'User not found' }
              }
            };
          }
          
          const updatedUser = {
            ...existingUser,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          
          return { data: updatedUser };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    // Get students
    getStudents: builder.query<{ data: Student[]; total: number }, StudentFilters>({
      queryFn: async (filters) => {
        try {
          await delay(500);
          
          let filteredStudents = [...mockStudents];
          
          // Apply filters
          if (filters.programId) {
            filteredStudents = filteredStudents.filter(student => student.programId === filters.programId);
          }
          
          if (filters.batchId) {
            filteredStudents = filteredStudents.filter(student => student.batchId === filters.batchId);
          }
          
          if (filters.status) {
            filteredStudents = filteredStudents.filter(student => student.status === filters.status);
          }
          
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredStudents = filteredStudents.filter(student =>
              student.fullName.toLowerCase().includes(searchTerm) ||
              student.rollNumber.toLowerCase().includes(searchTerm) ||
              student.admissionNumber.toLowerCase().includes(searchTerm)
            );
          }
          
          // Pagination
          const page = filters.page || 1;
          const limit = filters.limit || 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          
          const paginatedStudents = filteredStudents.slice(startIndex, endIndex);
          
          return {
            data: {
              data: paginatedStudents,
              total: filteredStudents.length,
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      providesTags: ['User'],
    }),

    // Create student
    createStudent: builder.mutation<Student, CreateStudentRequest>({
      queryFn: async (studentData) => {
        try {
          await delay(1000);
          
          const newStudent: Student = {
            id: Date.now().toString(),
            username: studentData.username,
            email: studentData.email,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            fullName: `${studentData.firstName} ${studentData.lastName}`,
            phone: studentData.phone,
            dateOfBirth: studentData.dateOfBirth,
            gender: studentData.gender,
            role: 'Student',
            institutionId: '1',
            centreId: '1',
            departmentId: '1',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            studentId: `STU${Date.now()}`,
            rollNumber: studentData.rollNumber,
            admissionNumber: studentData.admissionNumber,
            admissionType: studentData.admissionType,
            academicYear: studentData.academicYear,
            currentSemester: 1,
            admissionDate: studentData.admissionDate,
            status: 'Active',
            programId: studentData.programId,
            batchId: studentData.batchId,
            cgpa: 0,
            attendancePercentage: 100,
            feeStatus: 'Pending',
          };
          
          return { data: newStudent };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),

    // Get faculty
    getFaculty: builder.query<{ data: Faculty[]; total: number }, FacultyFilters>({
      queryFn: async (filters) => {
        try {
          await delay(500);
          
          let filteredFaculty = [...mockFaculty];
          
          // Apply filters
          if (filters.departmentId) {
            filteredFaculty = filteredFaculty.filter(faculty => faculty.departmentId === filters.departmentId);
          }
          
          if (filters.designation) {
            filteredFaculty = filteredFaculty.filter(faculty => faculty.designation === filters.designation);
          }
          
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredFaculty = filteredFaculty.filter(faculty =>
              faculty.fullName.toLowerCase().includes(searchTerm) ||
              faculty.employeeId.toLowerCase().includes(searchTerm) ||
              faculty.specialization.toLowerCase().includes(searchTerm)
            );
          }
          
          // Pagination
          const page = filters.page || 1;
          const limit = filters.limit || 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          
          const paginatedFaculty = filteredFaculty.slice(startIndex, endIndex);
          
          return {
            data: {
              data: paginatedFaculty,
              total: filteredFaculty.length,
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      providesTags: ['User'],
    }),

    // Create faculty
    createFaculty: builder.mutation<Faculty, CreateFacultyRequest>({
      queryFn: async (facultyData) => {
        try {
          await delay(1000);
          
          const newFaculty: Faculty = {
            id: Date.now().toString(),
            username: facultyData.username,
            email: facultyData.email,
            firstName: facultyData.firstName,
            lastName: facultyData.lastName,
            fullName: `${facultyData.firstName} ${facultyData.lastName}`,
            phone: facultyData.phone,
            role: 'Faculty',
            institutionId: '1',
            centreId: '1',
            departmentId: facultyData.departmentId,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            facultyId: `FAC${Date.now()}`,
            employeeId: facultyData.employeeId,
            designation: facultyData.designation,
            qualification: facultyData.qualification,
            specialization: facultyData.specialization,
            experienceYears: facultyData.experienceYears,
            joiningDate: facultyData.joiningDate,
          };
          
          return { data: newFaculty };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetStudentsQuery,
  useCreateStudentMutation,
  useGetFacultyQuery,
  useCreateFacultyMutation,
} = userApi;

