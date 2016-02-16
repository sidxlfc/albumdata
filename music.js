// Put your Last.fm API key here
var api_key = "c46d9bc8c2ad888b82c034aa050110fd";

function sendRequest () 
{
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);

    var similarArtistXHR = new XMLHttpRequest();
    var similarArtistMethod = "artist.getSimilar";    
    similarArtistXHR.open("GET", "proxy.php?method="+similarArtistMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);

    var albumsXHR = new XMLHttpRequest();
    var albumsMethod = "artist.getTopAlbums";
    albumsXHR.open("GET", "proxy.php?method="+albumsMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);    

    xhr.setRequestHeader("Accept","application/json");
    similarArtistXHR.setRequestHeader("Accept","application/json");
    albumsXHR.setRequestHeader("Accept","application/json");
    
    xhr.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var name = json.artist.name;
            var url = json.artist.url;
            var image = json.artist.image[2]["#text"];
            var content = json.artist.bio.content;

            //document.getElementById("output").innerHTML =  "<pre>" + str + "</pre>";
            document.getElementById("output").innerHTML =  "<h1>" + name + "</h1>";
            document.getElementById("outer").innerHTML =  "<img src = " + image + "></img>" + content;
            document.getElementById("url").innerHTML = "Click here to get more info on : " + "<a href = " + url + ">" + name + "</a>";
            //document.getElementById("content").innerHTML =  content;
        }   
    
    };
    xhr.send(null);

    
    albumsXHR.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            //var artist = encodeURI(document.getElementById("form-input").value);

            console.log(str);
            var albums = "<h3> Top Albums </h3>";

            for (var i = 0; i < json.topalbums.album.length; i += 2)
            {
                albums += "<figure><img src =" + json.topalbums.album[i].image[2]["#text"] + ">" + "<figcaption>" + json.topalbums.album[i].name + "</figcaption>" + "&emsp;";
                albums += "<img src =" + json.topalbums.album[i + 1].image[2]["#text"] + ">" + "<figcaption>" + json.topalbums.album[i + 1].name + "</figcaption>" + "</figure>&emsp;";
                //albums += "<figure><img src =" + json.topalbums.album[i + 2].image[2]["#text"] + "></img>" + "<figcaption>" + json.topalbums.album[i + 2].name + "</figcaption>" + "</figure>&emsp;";
            }

            document.getElementById("albums").innerHTML =  albums;
            
        }
    }
    albumsXHR.send(null);


    similarArtistXHR.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            var json = JSON.parse(this.responseText);
            //var str = JSON.stringify(json,undefined,2);
            var artist = encodeURI(document.getElementById("form-input").value);

            var similar = "<h3> Similar Artists </h3>";

            for (var i = 0; i < json.similarartists.artist.length; i++)
            {
                similar += "<li>" + json.similarartists.artist[i].name + "</li>";
            }

            document.getElementById("similar").innerHTML =  similar;
        }
    }
    similarArtistXHR.send(null);
}


/*
var similar = "";

            for (var i = 0; i < json.artist.similar.artist.length; i++)
            {
                similar += json.artist.similar.artist[0] + "<br>/"
            }

Artist name: 
Coldplay
  Display Info
{
  "artist": {
    "name": "Coldplay",
    "mbid": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
    "url": "http://www.last.fm/music/Coldplay",
    "image": [
      {
        "#text": "http://img2-ak.lst.fm/i/u/34s/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": "small"
      },
      {
        "#text": "http://img2-ak.lst.fm/i/u/64s/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": "medium"
      },
      {
        "#text": "http://img2-ak.lst.fm/i/u/174s/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": "large"
      },
      {
        "#text": "http://img2-ak.lst.fm/i/u/300x300/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": "extralarge"
      },
      {
        "#text": "http://img2-ak.lst.fm/i/u/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": "mega"
      },
      {
        "#text": "http://img2-ak.lst.fm/i/u/arQ/c3b97bea466440e5ab2078e6a3f6b2f9.png",
        "size": ""
      }
    ],
    "streamable": "0",
    "ontour": "1",
    "stats": {
      "listeners": "6341422",
      "playcount": "322913642"
    },
    "similar": {
      "artist": [
        {
          "name": "Keane",
          "url": "http://www.last.fm/music/Keane",
          "image": [
            {
              "#text": "http://img2-ak.lst.fm/i/u/34s/7deb6a392fb73d09592fd15cbf635084.png",
              "size": "small"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/64s/7deb6a392fb73d09592fd15cbf635084.png",
              "size": "medium"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/174s/7deb6a392fb73d09592fd15cbf635084.png",
              "size": "large"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/300x300/7deb6a392fb73d09592fd15cbf635084.png",
              "size": "extralarge"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/7deb6a392fb73d09592fd15cbf635084.png",
              "size": "mega"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/arQ/7deb6a392fb73d09592fd15cbf635084.png",
              "size": ""
            }
          ]
        },
        {
          "name": "Snow Patrol",
          "url": "http://www.last.fm/music/Snow+Patrol",
          "image": [
            {
              "#text": "http://img2-ak.lst.fm/i/u/34s/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": "small"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/64s/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": "medium"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/174s/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": "large"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/300x300/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": "extralarge"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": "mega"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/arQ/c6bc788e201ed7a3c01be16b78c840ec.png",
              "size": ""
            }
          ]
        },
        {
          "name": "OneRepublic",
          "url": "http://www.last.fm/music/OneRepublic",
          "image": [
            {
              "#text": "http://img2-ak.lst.fm/i/u/34s/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": "small"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/64s/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": "medium"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/174s/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": "large"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/300x300/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": "extralarge"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": "mega"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/arQ/a184a9fe3daa413db43c52a1c3a5a0fd.png",
              "size": ""
            }
          ]
        },
        {
          "name": "Travis",
          "url": "http://www.last.fm/music/Travis",
          "image": [
            {
              "#text": "http://img2-ak.lst.fm/i/u/34s/3032d92673becf1b9f5ea36a74168748.png",
              "size": "small"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/64s/3032d92673becf1b9f5ea36a74168748.png",
              "size": "medium"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/174s/3032d92673becf1b9f5ea36a74168748.png",
              "size": "large"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/300x300/3032d92673becf1b9f5ea36a74168748.png",
              "size": "extralarge"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/3032d92673becf1b9f5ea36a74168748.png",
              "size": "mega"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/arQ/3032d92673becf1b9f5ea36a74168748.png",
              "size": ""
            }
          ]
        },
        {
          "name": "Oasis",
          "url": "http://www.last.fm/music/Oasis",
          "image": [
            {
              "#text": "http://img2-ak.lst.fm/i/u/34s/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": "small"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/64s/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": "medium"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/174s/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": "large"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/300x300/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": "extralarge"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": "mega"
            },
            {
              "#text": "http://img2-ak.lst.fm/i/u/arQ/5feb4fbfb09d4800c865cce1041bb9fa.png",
              "size": ""
            }
          ]
        }
      ]
    },
    "tags": {
      "tag": [
        {
          "name": "rock",
          "url": "http://www.last.fm/tag/rock"
        },
        {
          "name": "alternative",
          "url": "http://www.last.fm/tag/alternative"
        },
        {
          "name": "britpop",
          "url": "http://www.last.fm/tag/britpop"
        },
        {
          "name": "alternative rock",
          "url": "http://www.last.fm/tag/alternative+rock"
        },
        {
          "name": "indie",
          "url": "http://www.last.fm/tag/indie"
        }
      ]
    },
    "bio": {
      "links": {
        "link": {
          "#text": "",
          "rel": "original",
          "href": "http://last.fm/music/Coldplay/+wiki"
        }
      },
      "published": "02 Feb 2006, 02:58",
      "summary": "Coldplay is a British alternative rock band, formed in London, United Kingdom in 1997. The band comprises vocalist and pianist Chris Martin, lead guitarist Jonny Buckland – who met each other in September 1996 at Ramsay Hall (halls of residence) at University College London - bassist Guy Berryman and drummer Will Champion.\n\nNot only have Coldplay had 7 highly successful studio album releases (all of which debuted at #1 on the UK album chart) - with their latest 7th studio album released on December 4 Read more on Last.fm",
      "content": "Coldplay is a British alternative rock band, formed in London, United Kingdom in 1997. The band comprises vocalist and pianist Chris Martin, lead guitarist Jonny Buckland – who met each other in September 1996 at Ramsay Hall (halls of residence) at University College London - bassist Guy Berryman and drummer Will Champion.\n\nNot only have Coldplay had 7 highly successful studio album releases (all of which debuted at #1 on the UK album chart) - with their latest 7th studio album released on December 4, 2015 (A Head Full of Dreams) - Coldplay have also achieved great success with their singles, such as Yellow, Speed of Sound, the Grammy-winning Clocks and the US and UK #1 single Viva La Vida.\n\n\nInfluences\nColdplay's early material was often compared to that of Jeff Buckley and Radiohead, while also drawing comparisons to U2 and Travis. Since the release of the band's debut album, Parachutes (2000), Coldplay has also drawn influence from other sources, including Echo and the Bunnymen and George Harrison on A Rush of Blood to the Head (2002) and Johnny Cash and Kraftwerk for X&Y (2005).\n\nFrontman Chris Martin credits 1980s Norwegian pop band a-ha for inspiring him to form his own band.\n\nColdplay never intended to become England's favorite rock & roll sons when their signature rock melodies ruled the charts throughout 2000. The quartet yearned to mess around a bit, plucking their own acoustics for fun while attending the University College of London. All had been playing instruments since their early teens and had been influenced by the likes of Bob Dylan, the Stone Roses, Neil Young, and My Bloody Valentine.\n\nThey never imagined taking reign of the UK's ever-changing rock scene. Each member had come from a solid household of middle-class parents who encouraged music. Chris Martin, the eldest of five siblings, began playing the piano as a young child. He started playing in bands around age 15 and sought solace in the words of Tom Waits. Jonny Buckland, on the other hand, was into the heavy guitar work of Eric Clapton and Jimi Hendrix and was playing guitar by age 11. Scotland native Guy Berryman was into funk instead of indie rock, therefore leaving him to play bass. The multi-instrumentalist Champion had not planned to be a drummer until he joined Coldplay. He favored playing guitar, bass, and the tin whistle, but caught on to playing percussion when the band became official.\n\nWhen they burst onto the scene, Coldplay were heart-wrenching like Travis, passionate like Jeff Buckley, and as fresh as Oasis. They played their first gig at a festival for unsigned bands in Manchester, and the Safety EP was issued shortly thereafter. The Brothers & Sisters EP was issued by Fierce Panda and released a year later. (Both releases saw only 500 pressings.) Their sweet melodies and swooning lyrics landed Coldplay a UK deal with Parlophone in April 1999, and the five-track limited edition Blue Room EP followed that autumn. With nods from the media, the dream pop foursome was hailed as the next Travis, thanks to their simplistic acoustics and charming personas. Two more EPs, Shiver and Yellow, arrived in Spring 2000.\n\nAlbums\nThe band has released 5 albums with the latest sixth album scheduled for release in May 2014: Parachutes (2000), A Rush Of Blood To The Head (2002), X&Y (2005), Viva la Vida or Death and All His Friends (2008), Mylo Xyoto (2011) and in May 2014, Ghost Stories (2014).\n\nParachutes (2000)\nTheir full-length debut album, Parachutes, earned the band a Mercury Music Prize nomination in the UK. It saw a US release in November 2000, and a month later Yellow,  was chosen as the theme song for all promo spots for the American TV network ABC. The well-received hype surrounding Coldplay continued throughout 2001 as well; they were nominated for three Brit Awards and embarked on a sold-out ten-date tour of the US. Rumors of a split consumed most of the US tour. Martin frequently battled nasty colds and voice exhaustion, which led Coldplay to cancel a series of American dates and scrap a European tour. With all gossip aside, Coldplay resumed playing in Summer 2001 and earned additional success with second single Trouble.\n\nA Rush of Blood to the Head (2002)\nBy the autumn, they had headed into the studio for a second album. Rumour had it that it might be Coldplay's last album, since the band members felt they might not capture such brilliance again. A Rush Of Blood To The Head was released in August 2002. The CD/DVD package Live 2003 was issued a year later. Capturing the band's show at the Horden Pavilion in Sydney, Australia, it highlighted Coldplay's monumental success worldwide with A Rush Of Blood To The Head. Martin specifically earned a higher notch on the celebrity scale by marrying actress Gwyneth Paltrow in December 2003. Paltrow gave birth to the couple's first daughter, Apple Blythe Alison Martin, the following April.\n\nX&Y (2005)\nFatherhood did not stop Martin from working, as Coldplay began recording material for a third album within weeks. Previously recorded material with long-time producer Ken Nelson was scrapped early on, while producer Danton Supple (Morrissey, The Cure) joined Coldplay to complete the recording of X&Y. Speed Of Sound marked Coldplay's first single from their long-awaited third effort in Spring 2005; the album followed in June, topping the charts around the world, including America and Britain.\n\nViva la Vida or Death and All His Friends (2008)\nColdplay's fourth album Viva la Vida or Death and All His Friends was released on June 12, 2008 in the United Kingdom, with the first single Violet Hill having been previously released as a free download through their official website for a week from April 29, 2008. Viva la Vida or Death and All His Friends was produced by Brian Eno, mixed by Markus Dravs, and drew influence from the time the group spent in South America. \nThe album received lots of positive feedback for its originality in melodic acoustics and slightly less 'synth-dependent' riffs. It offered a great insight into how significantly the band's music had adapted and developed to themselves and the public.\n\nCharity duet (single) for World AIDS Day (2008)\nBarely a week before the album Viva la Vida or Death and All His Friends was released, a duet with Kylie Minogue, which was intended to be used on the album, was scrapped with the comment that 'it’s just too sexy […] also we haven’t quite finished it'. The track, Lhuna was subsequently released as a charity single to promote World AIDS Day 2008 on December 1, 2008.\n\nMylo Xyloto (2011)\nColdplay's fifth album, Mylo Xyloto, was released on October 24, 2011, with the first two tracks from the album - Every Teardrop Is A Waterfall and Paradise - were released on June 3, 2011 and September 12, 2012 respectively. The album was no.1 in over 34 countries, and has sold over 8m copies worldwide.\n\nGhost Stories (2014)\nThe band's sixth album, Ghost Stories, was officially released on May 19, 2014. Prior to the release, Coldplay made the full album available to stream via iTunes, with an animation of the album artwork designed by Mila Fürstová, one week ahead of the official release date. The first track from the album, Midnight was released on February 25, 2014. The album was recorded at The Bakery and The Beehive studios in London, England. Ghost Stories entered the Billboard 200 as Number 1 and marked Coldplay's fourth straight number 1 studio album, selling 383,000 copies in the US in the week ending May 25, 2014 - of which 64% came from digital downloads according to Billboard.\n\nA Head Full of Dreams (2015)\nThe band's 7th studio album, A Head Full of Dreams, was released December 4, 2015 on the Parlophone label. The 11-track album (with an additional hidden track called “X Marks The Spot”) was recorded in LA and London, and was produced by Stargate and Rik Simpson. A world tour is promised to accompany the album in 2016.\n\nSuper Bowl - February 2016\nColdplay headlined at the much coverted Super Bowl 50 half-time show on February 7, 2016. The band performed a remixed version of their hit single \"Yellow\", before playing \"Vida La Vida\", \"Paradise\" and their 2015 single \"Adventure Of A Lifetime\". Bruno Mars and Mark Ronson then took to the stage to perform their hit \"Uptown Funk\", before Beyoncé emerged on stage with her latest single \"Formation\".\n\n2016 - First US tour since 2012\nColdplay announced its Head Full of Dreams tour on January 28, 2016 - the first in the USA since 2012. The first concert will be held at MetLife Stadium (New York) on July 16, 2016.\n\nCommercial endorsements\nColdplay are one of very few current British music acts to achieve major success in North America. Despite their large worldwide popularity, the band has remained protective of how their music is used in the media, refusing its use for product endorsements. In the past, Coldplay had turned down multi-million dollar contracts from Gatorade, Diet Coke, and Gap, who wanted to use the songs Yellow, Trouble, and Don't Panic respectively. According to Martin, \"We wouldn't be able to live with ourselves if we sold the songs' meanings like that.\"  On the other hand, Yellow has been used to back TV trailers for \"The Simpsons\" and Viva La Vida featured on an iTunes TV advert.\n\nPolitical and social activism\nSince 2002, Coldplay have been active supporters of various social and political causes. They have been visible advocates of Oxfam's Make Trade Fair campaign and Amnesty International. The group has also performed at various charity projects such as Band Aid 20, Live 8, and the Teenage Cancer Trust.\n\n\nOfficial website: www.coldplay.com\n Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply."
    }
  }
}
Click here to get more info on : Coldplay

*/