import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Op } from "sequelize";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
    ) {}

    async create(user: CreateUserDto) {
        if (!this.validateName(user.name)) {
            return {
                status: "error",
                message: `Username is required.`,
            };
        }

        if (!this.validateEmail(user.email)) {
            return {
                status: "error",
                message: `Invalid email address.`,
            };
        }

        if (!this.validatePassword(user.password)) {
            return {
                status: "error",
                message: `Password must be at least 3 characters long.`,
            };
        }

        try {
            user.role = 1;

            const userRequest = await this.userRepository.create(user as any);

            return {
                id: userRequest.id,
                status: "success",
                message: `User ${userRequest.name} created successfully`,
            };
        } catch (error) {
            return error;
        }
    }

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: number) {
        return this.userRepository.findByPk(id);
    }

    async update(id: number, user: UpdateUserDto) {
        try {
            const userRequest = await this.userRepository.findByPk(id);

            if (!userRequest) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            const userPassword = user.password;
            const userEmail = user.email;
            const userName = user.name;

            const validateUserPassword =
                typeof userPassword != "undefined" &&
                !this.validatePassword(userPassword);

            const validateUserEmail =
                typeof userEmail != "undefined" &&
                !this.validateEmail(userEmail);

            const validateUserName =
                typeof userName != "undefined" && !this.validateName(userName);

            if (validateUserPassword) {
                return {
                    status: "error",
                    message: `Password must be at least 3 characters long.`,
                };
            }

            if (validateUserName) {
                return {
                    status: "error",
                    message: `Username is required.`,
                };
            }

            if (validateUserEmail) {
                return {
                    status: "error",
                    message: `Invalid email address.`,
                };
            }

            if (user.password) {
                await userRequest.updateWithPassword(user);
            } else {
                await userRequest.update(user);
            }

            return {
                id: userRequest.id,
                status: "success",
                message: `User with ID ${id} updated successfully`,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findByPk(id);

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            if (user.status) {
                await user.disable(updateUserDto);
            }

            return {
                id: user.id,
                status: "success",
                message: `User with ID ${id} disabled`,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findByEmailOrName(search: string): Promise<User | null> {
        try {
            return this.userRepository.findOne({
                where: {
                    [Op.or]: [{ email: search }, { name: search }],
                },
            });
        } catch (e) {
            return null;
        }
    }

    validateName(name: string): boolean {
        const regex = /^.{1,}$/;
        return !!regex.test(name);
    }

    validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!regex.test(email);
    }

    validatePassword(password: string) {
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const regex = /^.{3,}$/;
        return !!regex.test(password);
    }
}
