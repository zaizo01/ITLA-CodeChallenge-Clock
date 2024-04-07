using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(string id);

        Task<TEntity>  AddAsync(TEntity entity);
    }
}
