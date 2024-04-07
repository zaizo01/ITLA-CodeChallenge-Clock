﻿using Backend.Core.Application.Dtos.Questions;
using Backend.Core.Application.Interfaces;
using Backend.Core.Domain.Entities;
using Backend.Infraestructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infraestructure.Persistence.Repositories;

public class QuestionRepository(ApplicationContext dbContext) : BaseRepository<Question>(dbContext),IQuestionRepository
{
    public async Task<List<Question>> GetAllByLevelAsync(string level)
    {
        try
        {
            var questions = await dbContext.Questions.Where(x => x.Level == level).ToListAsync();
            return questions;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}