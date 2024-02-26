using API.Extensions;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

// app.UseHttpsRedirection();

app.UseCors("AllowedOriginPolicy");

app.UseAuthorization();


app.MapControllers();


// Automated DB Migration
// This will create the database based on pending migrations if db does not exist when application is run.

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<TaskDBContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    // await TaskDBContextSeed.SeedDataAsync(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occured during database migration!");
}
// End of Automated DB Migration

app.Run();
