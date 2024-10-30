import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('/add_post')
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get('/get_post/:id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(Number(id));
    }

    @Patch('/add_image_key/:id/:image_key')
    update(@Param('id') id: string, @Param('image_key') image_key: string) {
        return this.postService.add_image_key(id, image_key);
    }

    @Patch('/add_post/:id/:title/:description')
    update_post(
        @Param('id') id: string,
        @Param('title') title: string,
        @Param('description') description: string
    ) {
        return this.postService.update_post(id, title, description);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }
}
