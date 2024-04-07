using Backend.Core.Application.Dtos.Questions;
using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Interfaces;

public interface IQuestionRepository : IBaseRepository<Question>
{
    Task<List<Question>> GetAllByLevelAsync(string level);
}