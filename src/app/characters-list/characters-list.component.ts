import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DisneyCharactersService } from '../services/disney-characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: any = [];

  totalElements = 0;
  totalPages = 0;

  params = {};

  displayedColumns: string[] = [
    'id',
    'name',
    'films',
    'tvShows',
    'videoGames',
    'view',
  ];

  loading = true;

  constructor(
    private disneyCharactersService: DisneyCharactersService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) {

  }
  
  ngOnInit(): void {

    this.params = {
      page: 1
    }
    this.loadData(this.params);
    
  }

  loadData(page: any) {

    this.disneyCharactersService.disneyCharacters(page)
    .subscribe((response: any) => {
      this.characters = response.data;
      this.totalElements = response.count;
      this.totalPages = response.totalPages;
      this.loading = false;
      this.cdRef.markForCheck();
    });
    
  }

  charClicked(id:number) {
    this.router.navigateByUrl('character/' + id).then();
  }

  pageChange(event: any) {
    this.params = {
      page: ++event.pageIndex
    }
    this.loadData(this.params);
  }

}
