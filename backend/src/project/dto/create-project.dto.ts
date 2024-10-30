export class CreateProjectDto {
    id: number;
    title: string;
    description: string;
    image_key: string;
    hidden: boolean;
    customer_link: string;
}
