using System.Data.Entity;
using GiftShop.DataAccess;

namespace GiftShop.Repository
{
    public abstract class RepositoryBase<TEntity,TModel> where TEntity : class,new()
    {
        protected GiftShopDBEntities _context;
        private DbSet<TEntity> _collection;

        public RepositoryBase()
        {
            this._context = new GiftShopDBEntities();
            this._collection = this._context.Set<TEntity>();
        }

        public DbSet<TEntity> Collection
        {
            get
            {
                return this._collection;
            }
        }


        public virtual bool Save(TEntity entity)
        {
            var entry = this._context.Entry<TEntity>(entity);
            entry.State = EntityState.Added;
            this._collection.Add(entity);
            return this._context.SaveChanges() > 0;
        }

        public virtual bool Update(TEntity entity)
        {
            this._collection.Attach(entity);
            var entry = this._context.Entry<TEntity>(entity);
            entry.State = EntityState.Modified;
            return this._context.SaveChanges() > 0;
        }


        public virtual bool Delete(TEntity entity)
        {
            this._collection.Attach(entity);
            var entry = this._context.Entry<TEntity>(entity);
            entry.State = EntityState.Deleted;
            return this._context.SaveChanges() > 0;
        }

        public abstract bool SaveFromModel(TModel model);
        public abstract bool DeleteFromModel(TModel model);
    }
}
