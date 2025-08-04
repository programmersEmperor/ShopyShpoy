import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validateRegistrationData = async (data: any, userType: 'user' | 'seller')=>{
    const { name, email, password, phone, country } = data;
    if(!name || !email || !password || (userType === 'seller' && (!phone || !country))){
        return new ValidationError('Missing required fields')
    }
    

} 