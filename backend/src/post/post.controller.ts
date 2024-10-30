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

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('/add_post')
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @Get('/get_posts')
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

    @Patch('/update_post/:id')
    update_post(@Param('id') id: string, @Body() createPostDto: CreatePostDto) {
        return this.postService.update_post(
            id,
            createPostDto.title,
            createPostDto.description
        );
    }

    @Delete('/delete_post/:id')
    delete_post(@Param('id') id: string) {
        return this.postService.delete_post(Number(id));
    }
}
