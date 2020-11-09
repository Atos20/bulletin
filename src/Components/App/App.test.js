import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { App } from "./App";
import { getTopStories } from '../../apiCalls.js'
jest.mock('../../apiCalls.js');
import moment from 'moment';

describe("App", () => {

  beforeEach( async() => {
  //   getTopStories.mockResolvedValueOnce({
  //     id: 1,
  //     last_updated:'today',
  //     newsType: 'automobiles',
  //     section: 'Automobiles mock',
  //     topStories:[
  //       {
  //         abstract:"A good host, he once said, could set his ego aside and let contestants be all they could be. But he let them know when he thought they missed easy answers.",
  //         byline: "By Katharine Q. Seelye",
  //         created_date: "mockDate",
  //         des_facet: [],
  //         geo_facet: [],
  //         item_type:"Article",
  //         kicker:"",
  //         material_type_facet:"",
  //         multimedia: [
  //         {
  //             caption:"Alex Trebek in 2010 on the set of “Jeopardy!” As the show’s host, Mr. Trebek was the essence of durability.",
  //             copyright:"Amanda Edwards/Getty Images",
  //             format:"superJumbo",
  //             height:1363,
  //             subtype:"photo",
  //             type:"image",
  //             url:"https://static01.nyt.com/images/2019/10/16/obituaries/00Trebeck1/merlin_76301875_8ff1776a-2a7d-4395-8493-092b35c7005b-superJumbo.jpg",
  //             width:""
  //         }
  //         ],
  //         org_facet: [],
  //         per_facet: ["Trebek, Alex"],
  //         published_date: "2020-11-08T12:41:08-05:00",
  //         saved: false,
  //         section:"arts",
  //         short_url:"",
  //         subsection:"television",
  //         title:"Alex Trebek, Longtime Host of ‘Jeopardy!,’ Dies at 80",
  //         updated_date:"2020-11-08T18:44:28-05:00",
  //         uri:"nyt://article/406907aa-cd83-5fdd-a34b-cae37788f5cc",
  //         url:"https://www.nytimes.com/2020/11/08/arts/television/alex-trebek-dead.html"
  //     }
  //   ]
  // })

    await waitFor(() => getTopStories.mockResolvedValue(
      { 
        copyright:"Mock copyright",
        last_updated:"MockDate",
        num_results: 1,
          results:[ 
          { 
            abstract:"Mock abstract",
            byline: "Mock author",
            created_date: "2020-11-08T12:41:08-05:00",
            des_facet: [],
            geo_facet: [],
            item_type:"Article",
            kicker:"",
            material_type_facet:"",
            multimedia: [
              {
                caption:"Mock cpation",
                copyright:"mock copyrights",
                format:"superJumbo",
                height:1363,
                subtype:"photo",
                type:"image",
                url:"mock url",
                width:""
              }
            ],
            org_facet: [],
            per_facet: ["Trebek, Alex"],
            published_date: "2020-11-08T12:41:08-05:00",
            saved: false,
            section:"sub Mock Category Title",
            short_url:"",
            subsection:"television",
            title:"Mock article title",
            updated_date:"2020-11-08T18:44:28-05:00",
            uri:"mock uri",
            url:"mock url"
          }
        ],
        section:"Mock Category Title",
        status:"OK"
    }));
  })

  it('User should see home page by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it('should have a default state', () => {
      const defaultApp = new App()
      expect(defaultApp.state.newsData).toStrictEqual({})
      expect(defaultApp.state.allNewsCategories.length).toStrictEqual(3)
      expect(defaultApp.state.selectedCategories).toStrictEqual([])
      expect(defaultApp.state. currentCategory).toStrictEqual({})
      expect(defaultApp.state.laterReadings).toStrictEqual([])
      expect(defaultApp.state.error).toStrictEqual('')
      expect(defaultApp.state.searchedItems).toStrictEqual({
        query: '',
        category: '', 
        results: [], 
        searchHistory:[]})
    });
    
  it('should display all intial elements',() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appTitle = screen.getByText('CommuniK');
    const appSubtitle = screen.getByRole('heading', { name: /headlines/i });
    const selectCategory = screen.getByTestId('select-multiple')
    const welcomingMessage = screen.getByText('Welcome to Communik');
    const todaysDate = screen.getByText(moment().format('LLL'))

    expect(appTitle).toBeInTheDocument();
    expect(appSubtitle).toBeInTheDocument();
    expect(selectCategory).toBeInTheDocument();
    expect(welcomingMessage).toBeInTheDocument();
    expect(todaysDate).toBeInTheDocument();
  });

  it('should be able to fillout the form and find stories that meet the criteria',() => {
  
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const artsCategory =  screen.getByText('arts')
    const automobileCategory = screen.getByText('automobiles')
    const booksCategory = screen.getByText('books')
    const selectCategory = screen.getByTestId('select-multiple')
    const searchBar = screen.getByPlaceholderText('search')
    const searchIcon = screen.getByTestId('search-icon')
    
    expect(artsCategory).toBeInTheDocument();
    expect(automobileCategory).toBeInTheDocument();
    expect(booksCategory).toBeInTheDocument();
    expect(selectCategory).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.selectOptions(selectCategory, [ 'arts','automobiles','books']);
    const optionOne = screen.getByText('arts');
    const optionTwo = screen.getByText('automobiles');
    const optionThree = screen.getByText('books');

    expect(optionOne).toBeInTheDocument(); 
    expect(optionTwo).toBeInTheDocument(); 
    expect(optionThree).toBeInTheDocument(); 

  });

  it('should render all the buttons to bavigate the application', () => {

    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const randomizeButton =  screen.getByRole('button', { name: /randomize/i })
    const homeButton = screen.getByRole('button', { name: /home/i })
    const myReadsButton = screen.getByRole('button', { name: /my reads/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    const searchByDate = screen.getByPlaceholderText(moment().format('MM-DD-YYYY'))

    expect(randomizeButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(myReadsButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchByDate).toBeInTheDocument();
  });

  it('it should render news options to choose from', async()=> {

    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const artsCategory = await waitFor(() => screen.getByTestId('arts'));
    const automobilesCategory = await waitFor(() => screen.getByTestId('automobiles'));
    const booksCategory= await waitFor(() => screen.getByTestId('books'));

    expect(artsCategory).toBeInTheDocument();
    expect(automobilesCategory ).toBeInTheDocument();
    expect(booksCategory).toBeInTheDocument();
  });

  it('the user should be able to select the arts category and' + 
     'then see all tops stories for the selected category', async() => {

    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const automobileCategory = await waitFor(() => screen.getByTestId('automobiles'));
    expect(automobileCategory).toBeInTheDocument();

    userEvent.click(automobileCategory)

    const mockCategoryTitle = await waitFor(() => screen.getByText('Mock Category Title'));
    const automobileTitle = await waitFor(() => screen.getByTestId('arts'));
    const mockArticleImg = await waitFor(() => screen.getByTestId('article img'));
    const mockArticleUpdatedDate = await waitFor(() => screen.getByText('Updated date Sunday, November 8, 2020 4:44 PM'));

    expect(automobileTitle).toBeInTheDocument();
    expect(mockCategoryTitle).toBeInTheDocument();
    expect(mockArticleImg ).toBeInTheDocument();
    expect(automobileTitle).toBeInTheDocument();
  });

  it('the user should be able to save stories to read for later', async() => {

    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const automobileCategory = await waitFor(() => screen.getByTestId('automobiles'));
    const myReadsButton = screen.getByRole('button', { name: /my reads/i })
    expect(automobileCategory).toBeInTheDocument();
    expect(myReadsButton).toBeInTheDocument();
    
    userEvent.click(automobileCategory);

    const saveReadingButton =  await waitFor(() =>screen.getByTestId('read for later icon'));
    expect(saveReadingButton).toBeInTheDocument();

    userEvent.click(saveReadingButton);
    userEvent.click(myReadsButton);
    
    const savedCategoryTitle = await waitFor(() => screen.getByText('Your reads'));
    const savedMockArticleTitle = await waitFor(() => screen.getByText('Mock article title'));
    const savedMockAbstract = await waitFor(() => screen.getByText('Mock abstract'));
    const savedMockArticleImg = await waitFor(() => screen.getByTestId('saved-image2020-11-08T12:41:08-05:00'));
    const savedMockPublusedDate = await waitFor(() => screen.getByText('Published date'));
    const savedMockArticleUpdatedDate = await waitFor(() => screen.getByText('Sunday, November 8, 2020 4:44 PM'));
    const savedMockAuthor = await waitFor(() => screen.getByText('Mock author'));
    const savedMockLinkToArticle= await waitFor(() => screen.getByText('find more'));
    const savedMockDeleteIcon= await waitFor(() => screen.getByTestId('delete icon'));

    expect(savedCategoryTitle).toBeInTheDocument();
    expect(savedMockAbstract).toBeInTheDocument();
    expect(savedMockArticleTitle).toBeInTheDocument();
    expect(savedMockArticleImg).toBeInTheDocument();
    expect(savedMockPublusedDate).toBeInTheDocument();
    expect(savedMockArticleUpdatedDate).toBeInTheDocument();
    expect(savedMockAuthor).toBeInTheDocument();
    expect(savedMockLinkToArticle).toBeInTheDocument();
    expect(savedMockDeleteIcon).toBeInTheDocument();

  });

    it('the user should be able to find for stories by date', async() => {

      render(
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      );
  
      const searchButton = screen.getByRole('button', { name: /search/i });
      const searchByDateField = screen.getByPlaceholderText(moment().format('MM-DD-YYYY'));

      expect(searchButton).toBeInTheDocument();
      expect(searchByDateField).toBeInTheDocument();

      userEvent.type(searchByDateField, '11/08/2020')
      expect(searchByDateField).toHaveValue('11/08/2020')
      
      userEvent.click(searchButton);
      
      const deleteReadingsButton =  await waitFor(() => screen.getByText('Delete All'));
      expect(deleteReadingsButton).toBeInTheDocument();

    });
    

      
    it('the user should be able to delete all saved stories', async() => {
      
      render(
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      );

      const automobileCategory = await waitFor(() => screen.getByTestId('automobiles'));
      const myReadsButton = screen.getByRole('button', { name: /my reads/i })
      expect(automobileCategory).toBeInTheDocument();
      expect(myReadsButton).toBeInTheDocument();
      
      userEvent.click(automobileCategory);
      
      const saveReadingButton =  await waitFor(() => screen.getByTestId('read for later icon'));
      expect(saveReadingButton).toBeInTheDocument();
      userEvent.click(saveReadingButton);

      
      userEvent.click(myReadsButton);
      
      const savedMockArticleImage =  await waitFor(() => screen.getByTestId('saved-image2020-11-08T12:41:08-05:00'));
      const savedMockAbstract = await waitFor(() =>screen.getByText('Mock abstract'));
      expect(savedMockArticleImage).toBeInTheDocument();
      expect(savedMockAbstract).toBeInTheDocument();

      const deleteReadingsButton =  await waitFor(() => screen.getByRole('button', { name: /delete all/i }));
      expect(deleteReadingsButton).toBeInTheDocument();
      
      userEvent.click(deleteReadingsButton);

      expect(savedMockArticleImage).toBeNull();
      expect(savedMockAbstract ).toBeNull();

      screen.debug()


    });
});

