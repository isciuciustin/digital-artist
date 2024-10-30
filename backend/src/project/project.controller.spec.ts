import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProjectController', () => {
    let controller: ProjectController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectController],
            providers: [ProjectService]
        }).compile();

        controller = module.get<ProjectController>(ProjectController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
