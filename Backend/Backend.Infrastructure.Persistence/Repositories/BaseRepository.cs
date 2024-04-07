using Backend.Core.Application.Interfaces;
using Backend.Infraestructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infraestructure.Persistence.Repositories
{
    public class BaseRepository<TEntity>(ApplicationContext dbContext) : IBaseRepository<TEntity>
        where TEntity : class
    {
        public DbSet<TEntity> Entities = dbContext.Set<TEntity>();

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await Entities.ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(string id)
        {
            return await Entities.FindAsync(id);
        }

        public async Task AddAsync(TEntity entity)
        {
            await Entities.AddAsync(entity);
            await dbContext.SaveChangesAsync();
        }
    }
}
