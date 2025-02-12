export interface IShopRegistration {
    name: string;
    email: string;
    phone: string;
    address?: string;
    country?: string;
    website?: string;
    logo?: string;
    bin?: string;
    description?: string;
    industry?: string;
    type?: string;
    employeeRange?: string;
}

export interface IAdditionalShopCreate {
    name: string;
    email: string;
    phone: string;
    address?: string;
    country?: string;
    website?: string;
    bin?: string;
    description?: string;
    industry?: string;
    type?: string;
    employeeRange?: string;
}

export interface IAssignManager {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'ADMIN';
}