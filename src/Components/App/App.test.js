import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { App } from "./App";
import { getTopStories } from '../../apiCalls.js'
jest.mock('../../apiCalls.js');

describe("App", () => {
  let mockCategories,
  mockNewsData

  beforeEach(() => {
    mockCategories = ['politics', 'sports', 'movies', 't-magazine', 'sundayreview']
    mockNewsData =  getTopStories.mockResolvedValue({
      automobiles: {
        copyright:"Copyright (c) 2020 The New York Times Company. All Rights Reserved.",
        last_updated:"2020-11-08T13:19:46-05:00",
        num_results: 1,
        results:[{
          abstract:"A good host, he once said, could set his ego aside and let contestants be all they could be. But he let them know when he thought they missed easy answers.",
          byline: "By Katharine Q. Seelye",
          created_date: "2020-11-08T12:41:08-05:00",
          des_facet: [],
          geo_facet: [],
          item_type:"Article",
          kicker:"",
          material_type_facet:"",
          multimedia: [
            {
              caption:"Alex Trebek in 2010 on the set of “Jeopardy!” As the show’s host, Mr. Trebek was the essence of durability.",
              copyright:"Amanda Edwards/Getty Images",
              format:"superJumbo",
              height:1363,
              subtype:"photo",
              type:"image",
              url:"https://static01.nyt.com/images/2019/10/16/obituaries/00Trebeck1/merlin_76301875_8ff1776a-2a7d-4395-8493-092b35c7005b-superJumbo.jpg",
              width:""
            }
          ],
          org_facet: [],
          per_facet: ["Trebek, Alex"],
          published_date: "2020-11-08T12:41:08-05:00",
          section:"arts",
          short_url:"",
          subsection:"television",
          title:"Alex Trebek, Longtime Host of ‘Jeopardy!,’ Dies at 80",
          updated_date:"2020-11-08T18:44:28-05:00",
          uri:"nyt://article/406907aa-cd83-5fdd-a34b-cae37788f5cc",
          url:"https://www.nytimes.com/2020/11/08/arts/television/alex-trebek-dead.html"
        }],
        section:"Arts",
        status:"OK"

      },
      politics:{

      }
    });
  })

  it('User should see home page by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
    
    it('should display all intial elements', async() => {

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    const appTitle = screen.getByRole('heading', { name: /communik/i });
    const appSubtitle = screen.getByRole('heading', { name: /headlines/i });
    const selectCategory = screen.getByRole('combobox');




    expect(appTitle).toBeInTheDocument();
    expect(appSubtitle).toBeInTheDocument();
    expect(selectCategory).toBeInTheDocument();


  });

  it('should render all news categories when the page loads',() => {
  
    render(
      <MemoryRouter>
        <App 
        />
      </MemoryRouter>
    );

    const artsCategory =  screen.getByText('arts')
    const automobileCategory = screen.getByText('automobiles')
    const booksCategory = screen.getByText('books')
    // const politicsCategory =  screen.getByText('politics')
    // const sportsCategory =  screen.getByText('sports')
    // const moviesCategory =  screen.getByText('movies')
    // const fashionCategory = screen.getByText('fashion')
    // const foodCategory = screen.getByText('food')
    // const technologyCategory = screen.getByText('technology')
    // const travelCategory = screen.getByText('travel')
    // const worldCategory = screen.getByText('world')
    // const businessCategory = screen.getByText('business'); 
    // const healthCategory = screen.getByText('health');
    // const insiderCategory = screen.getByText('insider');
    // const magazineCategory = screen.getByText('magazine');
    // const nyregionCategory= screen.getByText('nyregion');
    // const obituariesCategory = screen.getByText('obituaries');
    // const opinionCategory = screen.getByText('opinion');
    // const realstateCategory = screen.getByText('realestate');
    // const scienceCategory = screen.getByText('science');
    // const sundayreviewCategory = screen.getByText('sundayreview');
    // const theaterCategory = screen.getByText('theater');
    // const upshotCategory = screen.getByText('upshot');
    // const usCategory = screen.getByText('us');

    expect(artsCategory).toBeInTheDocument();
    expect(automobileCategory).toBeInTheDocument();
    expect(booksCategory).toBeInTheDocument();
    // expect(moviesCategory).toBeInTheDocument()
    // expect(sportsCategory).toBeInTheDocument()
    // expect(politicsCategory).toBeInTheDocument()
    // expect(fashionCategory).toBeInTheDocument();
    // expect(foodCategory).toBeInTheDocument();
    // expect(technologyCategory).toBeInTheDocument();
    // expect(travelCategory).toBeInTheDocument();
    // expect(worldCategory).toBeInTheDocument();
    // expect(businessCategory).toBeInTheDocument();  
    // expect(healthCategory).toBeInTheDocument();  
    // expect(insiderCategory).toBeInTheDocument();  
    // expect(magazineCategory).toBeInTheDocument();  
    // expect(nyregionCategory).toBeInTheDocument();  
    // expect(obituariesCategory).toBeInTheDocument();  
    // expect(opinionCategory).toBeInTheDocument();  
    // expect(realstateCategory).toBeInTheDocument();  
    // expect(scienceCategory).toBeInTheDocument();  
    // expect(sundayreviewCategory).toBeInTheDocument();
    // expect(theaterCategory).toBeInTheDocument();
    // expect(upshotCategory).toBeInTheDocument();
    // expect(usCategory).toBeInTheDocument();



  });
});

