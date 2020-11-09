import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { LaterReads } from "./LaterReads";

describe("LaterReads", () => {
    let mockDeleteSavedReading,
    laterReadings
    beforeEach(() => {
        mockDeleteSavedReading = jest.fn()
        laterReadings = [
          {
            abstract:"There’s butchery and blood aplenty in “The Kingdom,” but no sign of Nesbo’s beloved police detective — just two brothers who have been up to no good.",
            byline:"By Charles McGrath",
            created_date:"2020-11-06T10:08:05-05:00",
            des_facet:[],
            geo_facet:[],
            item_type:"Article",
            kicker:"Fiction",
            material_type_facet:"",
            multimedia:[{url: 'fakeURL'}],
            newsType:"books",
            org_facet:[],
            per_facet:["Nesbo, Jo"],
            published_date:"2020-11-06T10:08:05-05:00",
            saved:false,
            section:"books",
            short_url:"https://nyti.ms/38intaA",
            subsection:"review",
            title:"Jo Nesbo’s New Book Stars an Antisocial Loner. It’s Not Harry Hole.",
            updated_date:"2020-11-07T06:27:21-05:00",
            uri:"nyt://article/ebacc645-0764-5af6-9fc0-21c29d4eb87e",
            url: "https://www.nytimes.com/2020/11/06/books/review/jo-nesbo-the-kingdom.html",
          }
        ]
    })

  it("User should see home page by default", () => {
    render(
      <MemoryRouter>
        <LaterReads 
            laterReadings={laterReadings }
            deleteSavedReading={mockDeleteSavedReading}
        />
      </MemoryRouter>
    );

    const catergoryTitle = screen.getByRole('heading', { name: /your reads/i })
    const titleContent = screen.getByRole('heading', { name: /Jo Nesbo’s New Book Stars an Antisocial Loner. It’s Not Harry Hole./i });
    const publishedDateTitle = screen.getByText(/published date/i)
    const updatedDateTitle= screen.getByText(/updated date/i)
    const publishedDateContent = screen.getByText(/friday, november 6, 2020 8:08 am/i)
    const updatedDateContent = screen.getByText(/saturday, november 7, 2020 4:27 am/i)
    const articleContent = screen.getByText(/there’s butchery and blood aplenty in “the kingdom,” but no sign of nesbo’s beloved police detective — just two brothers who have been up to no good./i)
    const articleImage =  screen.getByTestId('article-image');
    const contentAuthor = screen.getByText(/by charles mcgrath/i)
    const articleLink = screen.getByRole('link', { name: /find more/i })

    expect(catergoryTitle).toBeInTheDocument();
    expect(titleContent).toBeInTheDocument();
    expect(publishedDateTitle).toBeInTheDocument();
    expect(updatedDateTitle).toBeInTheDocument();
    expect(publishedDateContent).toBeInTheDocument();
    expect(updatedDateContent).toBeInTheDocument();
    expect(articleContent ).toBeInTheDocument();
    expect(articleImage ).toBeInTheDocument();
    expect(contentAuthor).toBeInTheDocument();
    expect(articleLink).toBeInTheDocument();
});


});