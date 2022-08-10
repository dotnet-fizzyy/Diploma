using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public abstract class BaseEntityConfiguration<T> 
        where T : BaseEntity
    {
        protected void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(prop => prop.Id);
            
            builder.Property(prop => prop.CreationDate).HasColumnType("timestamptz");
        }
    }
}