import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionRepository: Repository<Transaction>,
	) {}

	async create(createTransactionDto: CreateTransactionDto, id: number) {
		const newTransaction = {
			title: createTransactionDto.title,
			amount: createTransactionDto.amount,
			type: createTransactionDto.type,
			user: { id },
			category: { id: createTransactionDto.category.id },
		};

		if (!newTransaction) throw new BadRequestException('Something went wrong');

		return await this.transactionRepository.save(newTransaction);
	}

	async findAll(id: number) {
		return await this.transactionRepository.find({
			where: {
				user: { id },
			},
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async findOne(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
			relations: {
				user: true,
				category: true,
			},
		});

		if (!transaction) {
			throw new NotFoundException('The transaction is not found');
		}

		return transaction;
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
		});

		if (!transaction) {
			throw new NotFoundException('The transaction is not found');
		}

		return await this.transactionRepository.update(id, updateTransactionDto);
	}

	async remove(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
		});

		if (!transaction) {
			throw new NotFoundException('The transaction is not found');
		}

		return await this.transactionRepository.delete(id);
	}

	async getAllWidthPagination(id: number, page: number, limit: number) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: { id },
			},
			relations: {
				category: true,
				user: true,
			},
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			skip: (page - 1) * limit,
		});

		return transactions;
	}

	async findAllByType(id: number, type: string) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: { id },
				type,
			},
		});

		console.log(transactions);

		const total = transactions.reduce((acc, obj) => acc + obj.amount, 0);
		console.log(total);
		return total;
	}
}
