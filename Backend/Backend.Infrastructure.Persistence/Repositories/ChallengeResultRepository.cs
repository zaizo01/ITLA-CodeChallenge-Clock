using Backend.Core.Application.Dtos.ChallengeResults;
using Backend.Core.Application.Interfaces;
using Backend.Core.Domain.Entities;
using Backend.Infraestructure.Persistence.Context;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Backend.Infraestructure.Persistence.Repositories;

public class ChallengeResultRepository(ApplicationContext dbContext, IConfiguration configuration)
    : BaseRepository<ChallengeResult>(dbContext), IChallengeResultRepository
{
    public async Task<IEnumerable<ChallengeResultDto>> GetAllByLevel(int level)
    {
        try
        {
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            
            const string query =
                @"SELECT cr.Id, cr.UserId, cr.CorrectAnswersCount, cr.Level, cr.MinutiesElapsed,us.FirstName,us.LastName,us.RegistrationNumber
                FROM ChallengeResults cr inner join [Identity].Users us on cr.UserId = us.Id where cr.Level = @level; ";
            
            var results = await connection.QueryAsync<ChallengeResultDto>(query, new { level = level });
            return results;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw new ApplicationException(ex.Message, ex);
        }
    }
}