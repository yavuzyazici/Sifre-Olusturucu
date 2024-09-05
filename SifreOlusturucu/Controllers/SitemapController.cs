using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace SifreOlusturucu.Controllers
{
    public class SitemapController : Controller
    {
        [Route("sitemap.xml")]
        public IActionResult Index()
        {
            var sitemapNodes = GetSitemapNodes();
            return this.Content(GenerateSitemapDocument(sitemapNodes), "application/xml", Encoding.UTF8);
        }

        private List<SitemapNode> GetSitemapNodes()
        {
            // Create your list of sitemap nodes here
            var nodes = new List<SitemapNode>
            {
                new SitemapNode { Url = "https://sifreolusturucu.com/", Priority = 1.0 },
                // Add more URLs as needed
            };
            return nodes;
        }

        private string GenerateSitemapDocument(List<SitemapNode> sitemapNodes)
        {
            var settings = new XmlWriterSettings { Indent = true };
            using (var stream = new Utf8StringWriter())
            {
                using (var writer = XmlWriter.Create(stream, settings))
                {
                    writer.WriteStartDocument();
                    writer.WriteStartElement("urlset", "http://www.sitemaps.org/schemas/sitemap/0.9");

                    foreach (var node in sitemapNodes)
                    {
                        writer.WriteStartElement("url");

                        writer.WriteElementString("loc", node.Url);
                        writer.WriteElementString("priority", node.Priority.ToString("F1"));

                        writer.WriteEndElement(); // url
                    }

                    writer.WriteEndElement(); // urlset
                    writer.WriteEndDocument();
                }
                return stream.ToString();
            }
        }
    }

    public class SitemapNode
    {
        public string Url { get; set; }
        public double Priority { get; set; }
    }

    public class Utf8StringWriter : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }
}
