import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/guard.config';
import { SearchRequestDTO } from 'src/request/search.request';
import { UserService } from 'src/service/account.service';

@ApiTags('Users Endpoints')
@Controller('accounts')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('pagination')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get paginated list' })
  @ApiBody({
    type: SearchRequestDTO,
    description: 'Search and pagination parameters',
  })
  @ApiResponse({ status: 200, description: 'Returns paginated list' })
  findAll(@Body() body: SearchRequestDTO) {
    return this.userService.findAll(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a data by ID' })
  @ApiResponse({ status: 200, description: 'Returns the data' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Post()
  // @UseGuards(AuthGuard)
  // @ApiOperation({ summary: 'Create a new data' })
  // @ApiBody({ type: any })
  // @ApiResponse({ status: 201, description: 'Data successfully created.' })
  // @ApiResponse({ status: 400, description: 'Bad request.' })
  // create(@Body() createUserDto: any) {
  //   return this.userService.create(createUserDto);
  // }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // @ApiOperation({ summary: 'Update a data' })
  // @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({ status: 200, description: 'Data successfully updated.' })
  // @ApiResponse({ status: 404, description: 'Data not found.' })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }
}
