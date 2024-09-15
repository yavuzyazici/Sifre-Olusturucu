var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

//app.UseStatusCodePages();
app.UseStatusCodePagesWithReExecute("/Error/Error404", "?code={0}");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");

    endpoints.MapControllerRoute(
        name: "sitemap",
        pattern: "sitemap.xml",
        defaults: new { controller = "Sitemap", action = "Index" });

    endpoints.MapControllerRoute(
    name: "EDevletSifreOlusturucu",
    pattern: "blog/e-devlet-sifre-olusturucu",
    defaults: new { controller = "Blog", action = "EDevletSifreOlusturucu" });

    endpoints.MapControllerRoute(
        name: "GuclutSifreNasilOlusturulur",
        pattern: "blog/guclu-sifre-nasil-olusturulur",
        defaults: new { controller = "Blog", action = "GuclutSifreNasilOlusturulur" });
});

app.Run();
