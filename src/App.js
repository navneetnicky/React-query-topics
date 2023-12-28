import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import './App.css';
import { HomePage } from './components/Home.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page.js';
import { SuperHeroesPage } from './components/SuperHeroes.page';
import { RQSuperHeroPage } from './components/RQSuperHero.page';
import { ParallelQueries } from './components/ParallelQueries.page.js';
import DynamicParallelQueries from './components/DynamicParallelQueries.page.js';
import DependentQueries from './components/DependentQueries.page.js';
import PaginatedQueries from './components/PaginatedQueries.page.js';
import InfiniteQueries from './components/InfiniteQuires.page.js';
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/super-heroes'>Traditional Super Heroes</Link>
							</li>
							<li>
								<Link to='/rq-super-heroes'>RQ Super Heroes</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route path='/rq-super-heroes/:heroId'>
							<RQSuperHeroPage />
						</Route>
						<Route path='/super-heroes'>
							<SuperHeroesPage />
						</Route>
						<Route path='/rq-super-heroes'>
							<RQSuperHeroesPage />
						</Route>
						<Route path='/rq-parallel'>
							<ParallelQueries />
						</Route>
						<Route path='/rq-paginated'>
							<PaginatedQueries />
						</Route>
						<Route path='/rq-infinite'>
							<InfiniteQueries />
						</Route>
						<Route path='/rq-dynamic-parallel'>
							<DynamicParallelQueries heroIds={[1, 3]} />
						</Route>
						<Route path='/rq-dependent'>
							<DependentQueries email='vishwas@exmple.com' />
						</Route>
						<Route path='/'>
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
