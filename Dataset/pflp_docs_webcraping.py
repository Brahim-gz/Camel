from bs4 import BeautifulSoup
import requests
import pandas as pd


def download_pdf(url, file_name, headers):

    # Send GET request
    response = requests.get(url, headers=headers)

    # Save the PDF
    if response.status_code == 200:
        with open(file_name, "wb") as f:
            f.write(response.content)
    else:
        print(response.status_code)


headers = {
        "User-Agent": "Chrome/51.0.2704.103",
    }


main_url = 'https://pflp-documents.org/page/'
max_pages = 11
result = []
id = 0

for p in range(max_pages):

    cur_url = main_url + str(p + 1)

    html_text = requests.get(cur_url).text
    soup = BeautifulSoup(html_text, 'lxml')

    ads = soup.find_all('div', class_ = 'post-column clearfix')
    respage = [[] for _ in range(len(ads))]

    for i in range(len(ads)):

        ad = ads[i]
        id+=1
        page = ad.find('div', class_ = 'read-more').a["href"]
        title = ad.find('h2', class_ = 'entry-title').text
        respage[i] = [[]for _ in range(2)]
        respage[i][0] = title
        url = page
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, 'lxml')

        download_url = soup.find('div', class_ = 'entry-content clearfix').find_all('a')

        respage[i][1] = []

        for j in range(len(download_url)):
         if (download_url[j]["href"].endswith(".pdf")):
           respage[i][1].append(download_url[j]["href"])
        for k in range(len(respage[i][1])):
          download_pdf(respage[i][1][k],"file"+str(id)+"-"+str(k)+".pdf", headers)
    result.extend(respage)

df = pd.DataFrame(result, columns = ["title", "download_url"])
# export as csv
filename = 'pflp-documents.csv'
df.to_csv(filename)