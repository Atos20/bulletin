import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { NavBar } from "./NavBar";
import moment from 'moment';

describe("NavBar", () => {

      let mockUpdateSearchCategory,
          mockSearchedItems,
          mockInjectOptionsCategories,
          mockUpdateSearchQuery,
          mockLaterReadings,
          mockFindUserStory,
          mockError,
          mockSaveToLocalStorage,
          mockDeleteAllSavedStories,
          mockGenerateRandomCategory,
          mockUserDate,
          mockSearchForStoriesByDate,
          mockQuery

    beforeEach(() => {
          mockUpdateSearchCategory = jest.fn()
          mockSearchedItems = {}
          mockInjectOptionsCategories = jest.fn()
          mockUpdateSearchQuery = jest.fn()
          mockLaterReadings = [
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
          mockFindUserStory = jest.fn()
          mockError = ''
          mockSaveToLocalStorage = jest.fn()
          mockDeleteAllSavedStories = jest.fn()
          mockGenerateRandomCategory = jest.fn()
          mockUserDate = "00/00/0000"
          mockSearchForStoriesByDate = jest.fn()
          mockQuery = 'query here'


    })
    it("User should see home page by default", () => {
    render(
      <MemoryRouter>
        <NavBar 
          updateSearchCategory={mockUpdateSearchCategory}
          searchedItems={mockSearchedItems}
          injectOptionsCategories={mockInjectOptionsCategories}
          updateSearchQuery={mockUpdateSearchQuery}
          laterReadings={mockLaterReadings}
          findUserStory={mockFindUserStory}
          error=''
          saveToLocalStorage={mockSaveToLocalStorage}
          deleteAllSavedStories={mockDeleteAllSavedStories}
          generateRandomCategory={mockGenerateRandomCategory}
          userDate={mockUserDate}
          searchForStoriesByDate={mockSearchForStoriesByDate}
          query={mockQuery}
        />
      </MemoryRouter>
    );
    });

    it('all initial elements should be visible to the user when the page loads', () =>{
      render(
        <MemoryRouter>
          <NavBar 
            updateSearchCategory={mockUpdateSearchCategory}
            searchedItems={mockSearchedItems}
            injectOptionsCategories={mockInjectOptionsCategories}
            updateSearchQuery={mockUpdateSearchQuery}
            laterReadings={mockLaterReadings}
            findUserStory={mockFindUserStory}
            error= ''
            saveToLocalStorage={mockSaveToLocalStorage}
            deleteAllSavedStories={mockDeleteAllSavedStories}
            generateRandomCategory={mockGenerateRandomCategory}
            userDate={mockUserDate}
            searchForStoriesByDate={mockSearchForStoriesByDate}
            query={mockQuery}
          />
        </MemoryRouter>
      );

        const currentDate = screen.getByText(moment().format('LLL'));
        const selectCategory = screen.getByTestId('select-multiple')
        const option1 = screen.getByText('categories');
        const searchBar = screen.getByPlaceholderText('search')
        const searchIcon = screen.getByTestId('search-icon')

        expect(currentDate).toBeInTheDocument();
        expect(selectCategory).toBeInTheDocument();
        expect(option1).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument();

        expect(searchBar).toHaveValue('query here')

        const randomizeButton =  screen.getByRole('button', { name: /randomize/i })
        const homeButton = screen.getByRole('button', { name: /my reads/i })
        const myReadsButton = screen.getByRole('button', { name: /home/i })
        const searchButton = screen.getByRole('button', { name: /search/i })
        const searchByDate = screen.getByPlaceholderText(moment().format('MM-DD-YYYY'))
    
        expect(randomizeButton).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
        expect(myReadsButton).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
        expect(searchByDate).toBeInTheDocument();

    })
});

