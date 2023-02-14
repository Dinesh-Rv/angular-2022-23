import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/common.service';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() selectedCategoryEvent = new EventEmitter<Category>();
  selectedCategory!: Category;
  category!: string;
  newCategory!: Category;
  categories: Category[] = [];
  @Output() isVisible!: boolean;
  iconName: string = 'menu';
  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  hideSideBar() {
    this.commonService.controlLeftSide();
  }

  addCategory(categoryName: string) {
    let newCategory = {
      id: 0,
      name: categoryName,
      iconName: 'list',
    };
    this.toDoService
      .addCategory(newCategory, 'category')
      .subscribe((response) => {
        if (response) {
          this.newCategory = newCategory;
        }
      });
  }

  ngOnInit() {
    this.commonService.presentCategory.subscribe((presentCategory) => {
      this.selectedCategory = presentCategory;
    });
  }
}
